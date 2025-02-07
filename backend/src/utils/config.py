import os
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Debug: Print environment variables (safely)
logger.info("Checking environment variables in config.py...")
logger.info(f"OPENAI_API_KEY exists: {bool(os.environ.get('OPENAI_API_KEY'))}")
logger.info(f"SUPABASE_URL exists: {bool(os.environ.get('SUPABASE_URL'))}")
logger.info(f"SUPABASE_KEY exists: {bool(os.environ.get('SUPABASE_KEY'))}")

# API Keys - No default values to force explicit configuration
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    logger.warning("⚠️ OPENAI_API_KEY is not configured. Application may not work properly.")

# Supabase config
SUPABASE_URL = os.environ.get("SUPABASE_URL")
if not SUPABASE_URL:
    logger.warning("⚠️ SUPABASE_URL is not configured. Application may not work properly.")

SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
if not SUPABASE_KEY:
    logger.warning("⚠️ SUPABASE_KEY is not configured. Application may not work properly.")

# App config
PORT = int(os.getenv("PORT", "8000"))
DEBUG = os.getenv("DEBUG", "False").lower() == "true"
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# Logging
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

# Critical configuration validation in production
if ENVIRONMENT == "production":
    if not all([OPENAI_API_KEY, SUPABASE_URL, SUPABASE_KEY]):
        error_msg = "Error: The following environment variables are required in production:\n"
        if not OPENAI_API_KEY:
            error_msg += "- OPENAI_API_KEY\n"
        if not SUPABASE_URL:
            error_msg += "- SUPABASE_URL\n"
        if not SUPABASE_KEY:
            error_msg += "- SUPABASE_KEY\n"
        raise ValueError(error_msg)