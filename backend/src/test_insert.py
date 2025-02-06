from db.queries import insert_question

def test_insert():
    result = insert_question("123", "How do I estimate parameters in MODFLOW?")
    print(result)

if __name__ == "__main__":
    test_insert()
