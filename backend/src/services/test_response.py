import asyncio
import os
import sys
from pathlib import Path

# Add the project root directory to Python path
project_root = str(Path(__file__).parent.parent.parent)
sys.path.append(project_root)

from src.services.response_service import ResponseService

async def main():
    """Main function to test response generation"""
    if len(sys.argv) < 2:
        print("Please provide a query as argument")
        sys.exit(1)
        
    # The query is just for display - we'll use enhanced_search_subq_1.json
    query = sys.argv[1]
    debug_dir = os.path.join(project_root, "debug")
    
    print(f"\nProcessing query: {query}")
    print("Using results from enhanced_search_subq_1.json")
    
    # Create ResponseService instance
    response_service = ResponseService()
    
    # Generate and print response
    response = await response_service.generate_response(debug_dir, query)
    
    if response.startswith("Error"):
        print(f"\n❌ Error: {response}")
    # else:
    #     print("\n✅ Generated Response:")
    #     print("-" * 50)
    #     print(response)
    #     print("-" * 50)
        
        # # Extract and print follow-up questions
        # questions = response_service.extract_follow_up_questions(response)
        # if questions:
        #     print("\n📝 Follow-up Questions:")
        #     for i, q in enumerate(questions, 1):
        #         print(f"{i}. {q}")

if __name__ == "__main__":
    asyncio.run(main()) 