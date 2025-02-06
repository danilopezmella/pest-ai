from db.connection import get_db_connection

def test_connection():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT NOW();")  # Consulta simple
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        print("✅ Conexión exitosa:", result)
    except Exception as e:
        print("❌ Error de conexión:", str(e))

if __name__ == "__main__":
    test_connection()
