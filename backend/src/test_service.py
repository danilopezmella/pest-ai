from src.services.question_service import save_question
from src.models.question import Question

def test_service():
    question = Question(user_id="456", question="What is parameter estimation?")
    result = save_question(question)
    print(result)

if __name__ == "__main__":
    test_service()
