import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# API Keys con valores por defecto para pruebas
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "sk-1234567890")  # Reemplazar con tu API key real

# Supabase config
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://your-supabase-url.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "your-supabase-key")