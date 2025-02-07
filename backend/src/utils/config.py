import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# API Keys con valores por defecto para pruebas
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # No default value to force setting it

# Supabase config
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# App config
PORT = int(os.getenv("PORT", "8000"))
DEBUG = os.getenv("DEBUG", "False").lower() == "true"
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# Logging
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")