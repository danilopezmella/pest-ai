# Advanced Document Search and Response Generation System

## Overview

This system implements a sophisticated document search and response generation workflow, combining multiple search strategies with natural language processing to provide accurate and contextual responses.

## Architecture

### 1. Search Pipeline

The search system uses a hybrid approach combining:
- Semantic Search (embeddings-based)
- Keyword Search (BM25)
- Filtered Search (pre-filtering by keywords)

#### Search Methods

1. **Default Hybrid Search** (alpha=0.5)
   - Combines semantic and keyword search with equal weights
   - Uses query variations for broader coverage
   - Returns top 5 results per sub-question

2. **Semantic-Only Search**
   - Uses embeddings for similarity matching
   - Good for conceptual understanding
   - Handles variations and synonyms well

3. **Keyword-Only Search**
   - Uses BM25 algorithm
   - Better for exact matches and specific terms
   - More precise but less flexible

4. **Hybrid Search with Custom Alpha**
   - Adjustable weight between semantic and keyword scores
   - alpha=0.7 favors keyword matches (70% keyword, 30% semantic)
   - alpha=0.3 favors semantic matches (30% keyword, 70% semantic)

5. **Hybrid Search with Keyword Filter**
   - Pre-filters documents using extracted keywords
   - Then applies hybrid search on filtered set
   - Best for targeted searches with known terms

### 2. Document Processing

1. **Query Processing**
   - Question improvement
   - Variation generation
   - Keyword extraction
   - Sub-question splitting

2. **Result Ranking**
   - Combined score calculation
   - Variation penalty application (10%)
   - Primary vs variation result balancing
   - Final reranking

### 3. Response Generation Workflow

1. **Input Processing**
   ```
   User Question → Question Improvement → Variations → Keywords → Sub-questions
   ```

2. **Search Process**
   ```
   For each sub-question:
     1. Run appropriate search method
     2. Collect results from primary query
     3. Process variations
     4. Combine and rerank results
   ```

3. **Response Generation**
   ```
   System Prompt + [Search Results as Context] + Improved Question → LLM → Final Response
   ```

## Implementation Guide

### 1. Backend Setup

```python
# Initialize search service
search_service = SearchService(default_alpha=0.5)

# Process question
processed_question = {
    "number_of_subquestions": 1,  # or more for split questions
    "subquestion1": "improved_question",
    "variations_subquestion1": ["var1", "var2", ...],
    "keywords_found_subquestion1": ["key1", "key2", ...]
}

# Get search results
results = search_service.hybrid_search_with_keywords(
    processed_question,
    limit=5,
    alpha=0.7
)
```

### 2. Frontend Integration

1. **Search Component**
   - Implement search method selection
   - Add alpha slider for hybrid search
   - Display result statistics

2. **Response Display**
   - Show source documents
   - Highlight matched sections
   - Display confidence scores

### 3. Response Generation

```python
def generate_response(system_prompt, search_results, improved_question):
    # Format search results as context
    context = format_results_as_context(search_results)
    
    # Combine prompts
    full_prompt = f"{system_prompt}\n\nContext:\n{context}\n\nQuestion: {improved_question}"
    
    # Generate response using LLM
    response = llm.generate(full_prompt)
    
    return response
```

## Best Practices

1. **Search Configuration**
   - Use hybrid search with alpha=0.7 for general queries
   - Use keyword filter for technical terms
   - Adjust alpha based on query type

2. **Result Processing**
   - Always include both primary and variation results
   - Maintain source tracking for citations
   - Keep confidence scores for transparency

3. **Response Generation**
   - Use structured system prompts
   - Include relevant context only
   - Maintain citation links

## Monitoring and Optimization

1. **Search Quality**
   - Track variation contribution
   - Monitor primary vs variation balance
   - Analyze keyword filter effectiveness

2. **Response Quality**
   - Evaluate answer relevance
   - Check source utilization
   - Monitor response coherence

## Example Usage

```python
# Example search configuration
search_config = {
    "method": "hybrid_filtered",
    "alpha": 0.7,
    "limit": 5
}

# Process and search
results = process_and_search(user_question, search_config)

# Generate response
response = generate_response(
    system_prompt=SYSTEM_PROMPT,
    search_results=results,
    improved_question=processed_question["subquestion1"]
)
```

## Future Improvements

1. **Search Enhancements**
   - Dynamic alpha adjustment
   - Improved variation generation
   - Better keyword extraction

2. **Response Generation**
   - Multi-step reasoning
   - Improved source integration
   - Enhanced context selection

3. **User Experience**
   - Interactive result filtering
   - Explanation of search decisions
   - Confidence visualization 