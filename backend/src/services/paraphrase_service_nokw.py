import os
import logging
import asyncio
from pydantic_ai import Agent
from dotenv import load_dotenv
from pydantic import BaseModel
from utils.config import OPENAI_API_KEY

# Configurar logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Cargar variables de entorno
load_dotenv()

# Usar la configuración centralizada
if OPENAI_API_KEY == "sk-1234567890":  # Si es el valor por defecto
    logger.warning("Using default test API key - replace with your actual key for production")

class QuestionProcessingResult(BaseModel):
    number_of_subquestions: int
    improved_sub_questions: list[str]
    variations: list[list[str]]

# Definir el agente de Pydantic AI
question_processing_agent = Agent(
    "openai:gpt-4-turbo",
    result_type=QuestionProcessingResult,
    system_prompt=(
        "You are an AI assistant that processes user questions. "
        "Follow these steps EXACTLY for EVERY question:"
        "1. First, identify if there are multiple sub-questions and split them."
        "2. For EACH question or sub-question, you MUST:"
        "   a. Improve its clarity while keeping the original meaning"
        "   b. Generate EXACTLY 5 distinct variations that ask the same thing differently"
        "3. Never return fewer than 5 variations per question"
        "4. Treat single questions and sub-questions exactly the same way"
        "5. Do NOT assume any domain knowledge or context"
        "6. Only fix grammar and wording, keep the original meaning intact"
        "7. IMPORTANT: Preserve technical terms exactly as they appear (e.g. NUMLAM, ICOR, etc)"
        "\nExample format:"
        "Single question: 'what is X?' ->"
        "variations: ["
        "  'What is the meaning of X?',"
        "  'Could you explain what X is?',"
        "  'What does X refer to?',"
        "  'Can you describe what X is?',"
        "  'Please explain what X means'"
        "]"
    )
)

async def process_question(question: str):
    """
    Procesa una pregunta del usuario mejorando la claridad, separando sub-preguntas si es necesario,
    y generando variaciones. Se implementan reintentos y un timeout para evitar bloqueos.
    """
    max_retries = 2
    timeout_seconds = 60  # Tiempo máximo de espera para cada llamada

    for attempt in range(max_retries):
        try:
            logger.info(f"Processing question: {question}")
            logger.debug(f"Attempt {attempt + 1} to process question")
            
            # Ejecuta la llamada al agente con un timeout para evitar que se quede colgado
            result = await asyncio.wait_for(
                question_processing_agent.run(question),
                timeout=timeout_seconds
            )
            
            # Loguear el resultado crudo
            logger.debug(f"Raw AI result: {result.data}")
            
            # Asegurarse de tener una estructura de salida consistente
            improved_sub_questions = result.data.improved_sub_questions or [question]
            logger.info(f"Improved sub-questions: {improved_sub_questions}")
            
            # Validar que se tengan variaciones para cada sub-pregunta
            if not result.data.variations or any(len(v) < 5 for v in result.data.variations):
                logger.warning("Missing or insufficient variations, attempting to retry...")
                if attempt < max_retries - 1:
                    continue  # Reintentar si aún no se alcanzó el máximo
                
                # Si después de los reintentos aún no se obtienen variaciones válidas, generar unas básicas
                variations = []
                for q in improved_sub_questions:
                    basic_variations = [
                        q,  # Original
                        f"Could you explain {q.lower().strip('?')}?",  # Forma educada
                        f"What is the meaning of {q.lower().strip('?')}?",  # Forma de definición
                        f"Please describe {q.lower().strip('?')}.",  # Forma de solicitud
                        f"I would like to understand {q.lower().strip('?')}."  # Forma enunciativa
                    ]
                    variations.append(basic_variations)
            else:
                variations = result.data.variations
            
            logger.debug(f"Generated variations: {variations}")

            # Preparar la respuesta final
            response = {
                "number_of_subquestions": len(improved_sub_questions),
                **{
                    f"subquestion{i+1}": improved_sub_questions[i] for i in range(len(improved_sub_questions))
                },
                **{
                    f"variations_subquestion{i+1}": variations[i][:5] for i in range(len(improved_sub_questions))
                }
            }
            
            logger.info(f"Final response: {response}")
            return response

        except asyncio.TimeoutError:
            logger.error(f"Attempt {attempt + 1} timed out after {timeout_seconds} seconds.", exc_info=True)
            if attempt == max_retries - 1:
                break  # Si se agota el tiempo en el último intento, se procederá a la respuesta de fallback
        except Exception as e:
            logger.error(f"Attempt {attempt + 1} failed: {str(e)}", exc_info=True)
            if attempt == max_retries - 1:
                break

    # Respuesta de fallback en caso de error después de los reintentos
    fallback = {
        "number_of_subquestions": 1,
        "subquestion1": question,
        "variations_subquestion1": [
            question,  # Original
            f"Could you explain {question.lower().strip('?')}?",
            f"What is the meaning of {question.lower().strip('?')}?",
            f"Please describe {question.lower().strip('?')}.",
            f"I would like to understand {question.lower().strip('?')}."
        ]
    }
    logger.info(f"Returning fallback response: {fallback}")
    return fallback

# Ejemplo de uso (si se ejecuta en un entorno asíncrono)
if __name__ == "__main__":
    import asyncio

    async def main():
        sample_question = "What is the impact of climate change on polar bears?"
        result = await process_question(sample_question)
        print(result)

    asyncio.run(main())
