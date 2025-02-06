from typing import List, Optional, Set, Dict
from pydantic import BaseModel, Field, field_validator
import re
from pathlib import Path
import json
from datetime import datetime
from pydantic_ai import Agent
import os

class RerankingAgent(Agent):
    """Agent for analyzing and reranking search results"""
    
    class Config:
        model_name = "4o-mini"
        temperature = 0.1
        max_tokens = 100000
    
    def complete(self, prompt: str) -> str:
        """Complete the prompt using the agent's model.
        
        Args:
            prompt: The prompt to complete
        """
        # For now, return a dummy response for testing
        # This will be replaced with actual model call
        return json.dumps({
            "analysis": [
                {
                    "doc_index": 1,
                    "score": 0.95,
                    "explanation": "This document directly explains what PESTMODE is and how to use it",
                    "key_points": ["Direct answer", "Clear explanation", "Complete information"]
                }
            ],
            "ranking_explanation": "Documents are ranked based on how directly they answer the query about PESTMODE",
            "search_quality": {
                "coverage": 0.9,
                "diversity": 0.8,
                "relevance": 0.95
            }
        })

    def analyze_results(self, query: str, results: List[dict]) -> str:
        """Analyze search results and provide reranking recommendations
        
        Args:
            query: User's search query
            results: List of search results with metadata
        """
        # Build context
        context = []
        context.append(f"Query: {query}\n")
        
        for i, result in enumerate(results, 1):
            context.append(f"\nDocument {i}:")
            context.append(f"Title: {result['header']}")
            context.append(f"Summary: {result['summary']}")
            context.append(f"Content:")
            context.append(result['content'])  # Use full content
            context.append(f"\nScores:")
            context.append(f"- Semantic: {result['semantic_score']:.3f}")
            context.append(f"- Keyword: {result['keyword_score']:.3f}")
            context.append("-" * 40)
        
        prompt = f"""As an expert search result ranker, analyze these results for the query "{query}".

For each document, evaluate:
1. How directly it answers the query
2. The completeness and accuracy of information
3. The technical depth and correctness
4. The document structure and readability
5. The context and related information provided

Consider the FULL content of each document for the most accurate analysis.

Return a JSON object with:
{{
    "analysis": [
        {{
            "doc_index": 1,
            "score": 0.95,  # 0-1 score based on relevance
            "explanation": "Detailed explanation of score...",
            "key_points": ["Important point 1", "Important point 2"]
        }},
        ...
    ],
    "ranking_explanation": "Overall explanation of ranking decisions...",
    "search_quality": {{
        "coverage": 0.9,  # How well results cover the query topic (0-1)
        "diversity": 0.8,  # Variety in perspectives/information (0-1)
        "relevance": 0.95  # Overall result relevance (0-1)
    }}
}}

Context:
{chr(10).join(context)}
"""
        return self.complete(prompt)

class SearchScore(BaseModel):
    """Represents the different scores for a search result"""
    combined_score: float = Field(default=0.0, description="Combined score from semantic and keyword")
    keyword_score: float = Field(default=0.0, description="Normalized keyword score")
    semantic_score: float = Field(default=0.0, description="Normalized semantic score")
    original_rank: float = Field(default=0.0, description="Original rank in results")
    original_similarity: float = Field(default=0.0, description="Original similarity score")
    agent_score: Optional[float] = Field(default=None, description="Score assigned by the agent")

class SearchResult(BaseModel):
    """Represents a single search result with all metadata"""
    doc_id: str = Field(alias="chunk_id", description="Unique document identifier")
    file_name: str = Field(default="N/A", description="Source file name")
    header: str = Field(default="N/A", description="Section header")
    level: int = Field(default=0, description="Header level")
    full_path: str = Field(default="N/A", description="Full navigation path")
    content: str = Field(default="", description="Document content")
    summary_self: str = Field(default="N/A", description="Self summary")
    summary_prev: Optional[str] = Field(default=None, description="Previous section summary")
    summary_next: Optional[str] = Field(default=None, description="Next section summary")
    header_summary_1: Optional[str] = Field(default=None, description="Level 1 header summary")
    header_summary_2: Optional[str] = Field(default=None, description="Level 2 header summary")
    prev_id: Optional[str] = Field(default=None, description="Previous document ID")
    next_id: Optional[str] = Field(default=None, description="Next document ID")
    keywords: List[str] = Field(default_factory=list, description="Keywords found in document")
    scores: SearchScore = Field(default_factory=SearchScore, description="Document scores")
    agent_explanation: Optional[str] = Field(default=None, description="Agent's explanation for the score")

    class Config:
        populate_by_name = True

class ReRankedResults(BaseModel):
    """Collection of reranked results"""
    query: str = Field(..., description="Original search query")
    detected_keywords: List[str] = Field(default_factory=list, description="Keywords detected in query")
    results: List[SearchResult] = Field(default_factory=list, description="Reranked results")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="When reranking was performed")
    agent_analysis: Dict = Field(default_factory=dict, description="Agent's analysis of results")

class ReRankingService:
    def __init__(self):
        """Initialize the reranking service"""
        self.seen_doc_ids: Set[str] = set()
        self.agent = RerankingAgent()

    def _analyze_results_with_agent(self, query: str, results: List[SearchResult]) -> str:
        """Use agent to analyze and explain the ranking of results
        
        Args:
            query: User's search query
            results: List of search results to analyze
        """
        # Prepare results for agent
        results_for_agent = [
            {
                "header": r.header,
                "summary": r.summary_self,
                "content": r.content,
                "semantic_score": r.scores.semantic_score,
                "keyword_score": r.scores.keyword_score
            }
            for r in results
        ]
        
        # Get agent analysis
        try:
            analysis = self.agent.analyze_results(query, results_for_agent)
            return analysis
        except Exception as e:
            print(f"Error in agent analysis: {e}")
            # Return dummy data as fallback
            return json.dumps({
                "analysis": [
                    {
                        "doc_index": i,
                        "score": result.scores.combined_score,
                        "explanation": "Error in agent analysis - using original scores",
                        "key_points": ["Using original ranking"]
                    }
                    for i, result in enumerate(results, 1)
                ],
                "ranking_explanation": "Error in agent analysis - using original ranking",
                "search_quality": {
                    "coverage": 0.5,
                    "diversity": 0.5,
                    "relevance": 0.5
                }
            })

    def _parse_md_scores(self, text: str) -> SearchScore:
        """Parse scores from markdown text format"""
        scores = SearchScore()
        
        # Extract scores using regex
        combined = re.search(r"Combined Score: ([\d.]+)", text)
        keyword = re.search(r"Keyword Score: ([\d.]+)", text)
        semantic = re.search(r"Semantic Score: ([\d.]+)", text)
        rank = re.search(r"Original Rank: ([\d.]+)", text)
        similarity = re.search(r"Original Similarity: ([\d.]+)", text)
        
        if combined:
            scores.combined_score = float(combined.group(1))
        if keyword:
            scores.keyword_score = float(keyword.group(1))
        if semantic:
            scores.semantic_score = float(semantic.group(1))
        if rank:
            scores.original_rank = float(rank.group(1))
        if similarity:
            scores.original_similarity = float(similarity.group(1))
            
        return scores

    def _parse_md_result(self, text: str) -> SearchResult:
        """Parse a single result from markdown format"""
        # Extract basic metadata
        doc_id = re.search(r"Document ID: ([a-f0-9]+)", text)
        file_name = re.search(r"File: (.+)", text)
        header = re.search(r"Header: (.+)", text)
        level = re.search(r"Level: (\d+)", text)
        
        # Extract content between ```
        content_match = re.search(r"```\n(.*?)\n\s*```", text, re.DOTALL)
        content = content_match.group(1).strip() if content_match else ""
        
        # Create result object
        result = SearchResult(
            chunk_id=doc_id.group(1) if doc_id else "MISSING",
            file_name=file_name.group(1) if file_name else "N/A",
            header=header.group(1) if header else "N/A",
            level=int(level.group(1)) if level else 0,
            content=content,
            scores=self._parse_md_scores(text)
        )
        
        # Extract summaries and other metadata
        self_summary = re.search(r"Self Summary: (.+)", text)
        if self_summary:
            result.summary_self = self_summary.group(1)
            
        # Add to seen doc_ids
        self.seen_doc_ids.add(result.doc_id)
        
        return result

    def rerank_from_md(self, md_path: str, query: str) -> ReRankedResults:
        """Rerank results from a markdown debug file
        
        Args:
            md_path: Path to markdown debug file
            query: Original search query
        """
        self.seen_doc_ids.clear()
        
        # Read markdown file
        with open(md_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Extract keywords if present
        keywords_match = re.search(r"Keywords: \[(.*?)\]", content)
        keywords = []
        if keywords_match:
            keywords = [k.strip(' "\'') for k in keywords_match.group(1).split(',')]
            
        # Split into individual results
        results_sections = re.split(r"-{80}", content)
        
        # Parse each result
        results = []
        for section in results_sections:
            if "Document ID:" in section:
                try:
                    result = self._parse_md_result(section)
                    results.append(result)
                except Exception as e:
                    print(f"Error parsing result: {e}")
        
        # Rerank using agent
        print("\n🤖 Performing agent-based reranking...")
        analysis = self._analyze_results_with_agent(query, results)
                    
        # Create final output
        reranked = ReRankedResults(
            query=query,
            detected_keywords=keywords,
            results=results,
            agent_analysis=json.loads(analysis)
        )
        
        return reranked

    def save_reranked_results(self, results: ReRankedResults, output_path: str):
        """Save reranked results to a JSON file
        
        Args:
            results: ReRankedResults object
            output_path: Where to save the JSON file
        """
        # Convert to dict and save
        data = results.model_dump(mode='json')
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, default=str) 