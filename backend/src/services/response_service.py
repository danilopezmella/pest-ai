import logging
import json
import os
from typing import Dict, List, Any, Generator, Union
from openai import AsyncOpenAI
from dotenv import load_dotenv
import sys
from utils.config import OPENAI_API_KEY
import json
import os
from datetime import datetime  # Agregar esta línea
from typing import List, Dict

from loguru import logger

from config.prompts import (
    RESPONSE_SYSTEM_PROMPT, 
    RESPONSE_USER_PROMPT,
    SYNTHESIS_PROMPT_TEMPLATE,
    INTERMEDIATE_QUESTION_TEMPLATE
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv(override=False)

class ResponseService:
    """Service for generating responses using OpenAI's API directly"""
    
    def __init__(self):
        """Initialize the response service"""
        self.model = "gpt-4-turbo-preview"  # Using GPT-4 Turbo for better responses
        self.openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)
        self.is_keyword_search = False
        

    def prepare_response_messages(self, query: str, context: str, keywords: List[str] = None) -> List[Dict[str, str]]:
        """Prepare messages for response generation"""
        # Format keywords section
        keywords_section = f"🔑 Keywords: {', '.join(keywords)}\n\n" if keywords else ""
        
        # Construct the user message
        user_message = RESPONSE_USER_PROMPT.format(
            query=query,
            keywords_section=keywords_section,
            context=context
        )
        
        return [
            {"role": "system", "content": RESPONSE_SYSTEM_PROMPT},
            {"role": "user", "content": user_message}
        ]
    
    def get_llm_response(self, messages: List[Dict[str, str]], stream: bool = False) -> Union[Dict, Generator]:
        """Get LLM response using provided messages"""
        try:
            if stream:
                return self.stream_response(messages)
            
            response = self.openai_client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.7,
                max_tokens=2000,
                stream=False
            )
            return {
                "content": response.choices[0].message.content,
                "finish_reason": response.choices[0].finish_reason,
                "messages": messages
            }
        except Exception as e:
            logger.error(f"Error getting LLM response: {e}")
            return {"error": str(e)}
    
    def stream_response(self, messages: List[Dict[str, str]]) -> Dict:
        """Stream GPT-4 response and return both content and exact messages sent"""
        try:
            stream = self.openai_client.chat.completions.create(
                model=self.model,
                messages=messages,
                stream=True
            )
            
            content = ""
           
            for chunk in stream:
                if chunk.choices[0].delta.content:
                    content += chunk.choices[0].delta.content
                    print(chunk.choices[0].delta.content, end="", flush=True)
            print("\n\n✅ Response Complete!\n")
           
            
            return {
                'content': content,
                'messages': messages
            }
            
        except Exception as e:
            logger.error(f"Error streaming response: {e}")
            return {"error": str(e)}
  
    def format_results(self, results: List[Dict]) -> str:
        """Format results with essential metadata"""
        formatted = []
        for result in results[:5]:  # Top 5 only
            formatted.append(
                f"File: {result['file_name']}\n"
                f"Section: {result['header']}\n\n"
                f"Content:\n```\n{result['content']}\n```\n\n"
                f"Context:\n"
                f"- Previous: {result['summary_prev']}\n"
                f"- Next: {result['summary_next']}\n\n"
                f"Related Topics: {', '.join(result['keywords'])}\n"
            )
        return "\n---\n".join(formatted)

    def save_prompt_to_file(self, messages: List[Dict[str, str]], debug_dir: str, prefix: str) -> None:
        """Save the complete prompt and context to a markdown file with timestamp"""
        try:
            from datetime import datetime
            timestamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
            
            content = []
            content.append(f"# {prefix.upper()} Prompt - {timestamp}\n")
            
            for msg in messages:
                content.append(f"## {msg['role'].upper()}")
                content.append("```")
                content.append(msg['content'])
                content.append("```\n")

            # Save to file with timestamp
            filename = os.path.join(debug_dir, f"{timestamp}_{prefix}_prompt.md")
            with open(filename, 'w', encoding='utf-8') as f:
                f.write("\n".join(content))
            print(f"Saved prompt to: {filename}")
        except Exception as e:
            logger.error(f"Error saving prompt to file: {e}")

    async def generate_response(self, search_results: List[Dict], question: str):
        """Generate a streaming response using OpenAI."""
        try:
            logger.info("🤖 Generating response for question: %s", question)

            # Formatear contexto
            context = self._format_context(search_results)
            print("\n📝 Formatted context:")
            print(context)

            # Crear mensajes
            messages = [
                {"role": "system", "content": RESPONSE_SYSTEM_PROMPT},
                {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {question}\n\nAnswer:"}
            ]

            # Llamada a OpenAI con streaming activado
            response_stream = await self.openai_client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.3,
                max_tokens=2000,
                stream=True  
            )

            # Procesar la respuesta en streaming
            collected_text = ""
            async for chunk in response_stream:  
                if hasattr(chunk, "choices") and chunk.choices:
                    delta = chunk.choices[0].delta  
                    if hasattr(delta, "content") and delta.content:
                        collected_text += delta.content
                        print(delta.content, end="", flush=True) 

            print("\n✨ OpenAI response (streamed):")
            print(collected_text)

            # Guardar el prompt para depuración
            debug_dir = "debug"
            os.makedirs(debug_dir, exist_ok=True)
            self.save_prompt_to_file(messages, debug_dir, "response")

            return collected_text  # Devuelve la respuesta completa

        except Exception as e:
            logger.error("❌ Error generating response: %s", str(e))
            raise


    async def stream_response(self, search_results: List[Dict], question: str):
        """Generate a streaming response based on search results using OpenAI."""
        try:
            logger.info("🤖 Generating streaming response for question: %s", question)
            
            # Format context from results
            context = self._format_context(search_results)
            
            # Generate response using OpenAI with streaming
            messages = [
                {"role": "system", "content": RESPONSE_SYSTEM_PROMPT},
                {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {question}\n\nAnswer:"}
            ]
            
            # Use OpenAI to generate response
            response = await self.openai_client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.7,
                max_tokens=8000,
                stream=True
            )
            
            # Process the streaming response
            async for chunk in response:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content
            
            # Save prompt for debugging
            debug_dir = "debug"
            os.makedirs(debug_dir, exist_ok=True)
            self.save_prompt_to_file(messages, debug_dir, "response")
            
        except Exception as e:
            logger.error("❌ Error generating streaming response: %s", str(e))
            raise


    async def generate_streaming_response(self, search_results: List[Dict], question: str):
        """Generate a streaming response from OpenAI."""
        try:
            
                # Save debug info first
            debug_file = self.save_stream_debug(search_results, question)
            print(f"🔍 Debug info saved to: {debug_file}")
            
            messages = [
                {"role": "system", "content": RESPONSE_SYSTEM_PROMPT},
                {"role": "user", "content": f"Context:\n{self._format_context(search_results)}\n\nQuestion: {question}\n\nAnswer:"}
            ]

            response_stream = await self.openai_client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.3,
                max_tokens=500,
                stream=True
            )

            async for chunk in response_stream:
                if hasattr(chunk, "choices") and chunk.choices:
                    delta = chunk.choices[0].delta
                    if hasattr(delta, "content") and delta.content:
                        yield delta.content  # 🔹 Enviar fragmento en el stream

        except Exception as e:
            yield f"\nError: {str(e)}"

    def _format_context(self, search_results: List[Dict]) -> str:
        """Send complete search results to LLM including all metadata"""
        return json.dumps(search_results, indent=2, ensure_ascii=False)
    
    def save_stream_debug(self, markdown_contents: str, question: str, debug_dir: str = "debug/stream") -> str:
        """Save debug information including raw markdown files and prompts"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        os.makedirs(debug_dir, exist_ok=True)
        
        content = []
        content.append(f"# Stream Debug - {timestamp}\n")
        
        # Raw question
        content.append("# Original Question")
        content.append("```")
        content.append(str(question))
        content.append("```\n")
        
        # Markdown content
        content.append("# Context Content")
        content.append("```markdown")
        content.append(markdown_contents)
        content.append("```\n")
        
        # System Prompt
        content.append("# System Prompt")
        content.append("```")
        content.append(RESPONSE_SYSTEM_PROMPT)
        content.append("```\n")

        # Full User Message
        content.append("# Full User Message")
        content.append("```")
        content.append(RESPONSE_USER_PROMPT.format(
            query=question,
            context=markdown_contents
        ))
        content.append("```\n")

        # Complete Messages Array
        content.append("# Complete Messages Array")
        content.append("```json")
        messages = [
            {"role": "system", "content": RESPONSE_SYSTEM_PROMPT},
            {"role": "user", "content": RESPONSE_USER_PROMPT.format(
                query=question,
                context=markdown_contents
            )}
        ]
        content.append(json.dumps(messages, indent=2, ensure_ascii=False))
        content.append("```")
        
        # Save to file
        filename = os.path.join(debug_dir, f"stream_debug_{timestamp}.md")
        with open(filename, 'w', encoding='utf-8') as f:
            f.write("\n".join(content))
        
        print(f"\n📝 Raw stream debug saved to: {filename}")
        return filename

    async def generate_streaming_response_multi_rerank(self, markdown_files: List[str], question: str, subquestions: List[str]):
        """Generate a streaming response using markdown files as context."""
        try:
            # Setup debug directory for raw LLM output
            debug_dir = "debug/stream/llm_raw"
            os.makedirs(debug_dir, exist_ok=True)
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            raw_output_file = os.path.join(debug_dir, f"llm_raw_{timestamp}.txt")
            
            # Lista para acumular respuestas previas
            previous_responses = []
            
            # Initial separator
            yield "\n\n"
            yield "=" * 80 + "\n"
            yield "🔍 Starting Multi-Question Analysis\n"
            yield "=" * 80 + "\n\n"
            
            # Process each subquestion independently
            for idx, (md_file, subquestion) in enumerate(zip(markdown_files, subquestions), 1):
                is_last_question = idx == len(subquestions)
                print(f"\n🔍 Processing {'final' if is_last_question else ''} subquestion {idx} of {len(subquestions)}...")
                print(f"Subquestion: {subquestion}")
                
                # Add separator between responses
                if idx > 1:
                    yield "\n\n"
                    yield "=" * 80 + "\n"
                    yield f"Moving to {'Final Analysis' if is_last_question else f'Question {idx}'} ({idx} of {len(subquestions)})\n"
                    yield "=" * 80 + "\n\n"
                
                # Add subquestion header with visual elements
                yield f"🔹 {'Final Analysis' if is_last_question else f'Question {idx}/{len(subquestions)}'}: {subquestion}\n"
                yield "=" * 80 + "\n\n"
                
                # Read markdown file content
                if not os.path.exists(md_file):
                    print(f"❌ File does not exist: {md_file}")
                    continue
                    
                print(f"✅ Reading markdown file: {md_file}")
                with open(md_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # Save debug info for this subquestion
                debug_dir = f"debug/stream/subq_{idx}"
                debug_file = self.save_stream_debug(
                    content, 
                    subquestion,
                    debug_dir=debug_dir
                )
                print(f"📝 Debug info saved to: {debug_file}")
                
                # Preparar mensajes según si es la última pregunta o no
                if is_last_question and previous_responses and len(subquestions) > 1:
                    # Prompt especial para síntesis final usando el template
                    synthesis_prompt = SYNTHESIS_PROMPT_TEMPLATE.format(
                        main_question=question,
                        separator='-' * 40,
                        previous_responses=json.dumps(previous_responses, indent=2)
                    )
                    messages = [
                        {"role": "system", "content": RESPONSE_SYSTEM_PROMPT},
                        {"role": "user", "content": synthesis_prompt}
                    ]
                else:
                    # Usar el template intermedio para preguntas no finales
                    messages = [
                        {"role": "system", "content": RESPONSE_SYSTEM_PROMPT},
                        {"role": "user", "content": INTERMEDIATE_QUESTION_TEMPLATE.format(
                            question_number=idx,
                            total_questions=len(subquestions),
                            question=subquestion,
                            context=content
                        )}
                    ]
                
                # Generate response for this subquestion
                print(f"🤖 Generating response for {'final analysis' if is_last_question else f'subquestion {idx}'}...")
                response_stream = await self.openai_client.chat.completions.create(
                    model=self.model,
                    messages=messages,
                    temperature=0.3,
                    max_tokens=4000,
                    stream=True
                )
                
                # Stream response for this subquestion
                subq_content = []  # Acumular contenido de esta subquestion
                async for chunk in response_stream:
                    if chunk.choices[0].delta.content:
                        content = chunk.choices[0].delta.content
                        subq_content.append(content)  # Guardar chunk
                        yield content  # Enviar al frontend
                
                # Guardar contenido raw de esta subquestion
                with open(raw_output_file, "a", encoding="utf-8") as f:
                    f.write(f"\n\n=== {'Final Analysis' if is_last_question else f'Subquestion {idx}'} Raw Output ===\n")
                    f.write(f"Question: {subquestion}\n")
                    f.write("Raw Content:\n")
                    f.write("".join(subq_content))
                    f.write("\n=== End Subquestion {idx} ===\n")
                
                # Guardar respuesta para síntesis posterior si no es la última
                if not is_last_question:
                    previous_responses.append({
                        "question": subquestion,
                        "response": "".join(subq_content)
                    })
                        
                print(f"✅ Completed response for {'final analysis' if is_last_question else f'subquestion {idx}'}")
            
            # Final separator
            yield "\n\n"
            yield "=" * 80 + "\n"
            yield "✨ Analysis Complete\n"
            yield "=" * 80 + "\n"
                
        except Exception as e:
            logger.error(f"Error in generate_streaming_response_multi_rerank: {str(e)}", exc_info=True)
            yield f"\nError: {str(e)}"


    # async def generate_streaming_response_with_prompts(
    #     self, 
    #     markdown_content: str,
    #     system_prompt: str,
    #     user_prompt: str,
    #     debug_dir: str = "debug/stream/custom",
    #     save_debug: bool = True
    # ):
    #     """Generate a streaming response using custom prompts and markdown content.
        
    #     Args:
    #         markdown_content: The markdown content to use as context
    #         system_prompt: The system prompt to use
    #         user_prompt: The user prompt template to use (should contain {context} placeholder)
    #         debug_dir: Directory to save debug files (if save_debug=True)
    #         save_debug: Whether to save debug files
        
    #     Yields:
    #         Chunks of the generated response as they become available
    #     """
    #     try:
    #         # Save debug info if requested
    #         if save_debug:
    #             debug_file = self.save_stream_debug(
    #                 markdown_content,
    #                 user_prompt,  # Usamos el user prompt como "question" para el debug
    #                 debug_dir=debug_dir
    #             )
    #             print(f"\n🔍 Debug info saved to: {debug_file}")
            
    #         # Prepare messages
    #         messages = [
    #             {"role": "system", "content": system_prompt},
    #             {"role": "user", "content": user_prompt.format(
    #                 context=markdown_content
    #             )}
    #         ]
            
    #         # Generate response
    #         response_stream = await self.openai_client.chat.completions.create(
    #             model=self.model,
    #             messages=messages,
    #             temperature=0.3,
    #             max_tokens=4000,
    #             stream=True
    #         )
            
    #         # Stream the response
    #         async for chunk in response_stream:
    #             if chunk.choices[0].delta.content:
    #                 yield chunk.choices[0].delta.content
                        
    #     except Exception as e:
    #         logger.error(f"Error in generate_streaming_response_with_prompts: {str(e)}", exc_info=True)
    #         yield f"\nError: {str(e)}"