import logging
from utils.csv_loader import load_keywords
import re
import os

# Configure logging
logger = logging.getLogger(__name__)

# Try to load keywords, but handle missing file gracefully
try:
    logger.info("Loading keywords from CSV file...")
    keywords_path = os.path.join(os.path.dirname(__file__), "..", "data", "keywords.csv")
    KEYWORDS = load_keywords(keywords_path)
    logger.info(f"Loaded {len(KEYWORDS)} keywords")
except FileNotFoundError:
    logger.warning("Keywords file not found. Using empty keywords list.")
    KEYWORDS = []
except Exception as e:
    logger.error(f"Error loading keywords: {str(e)}")
    KEYWORDS = []

def detect_keywords(question: str):
    """Detects if the question contains any predefined keywords."""
    logger.debug(f"Detecting keywords in question: {question}")
    
    if not KEYWORDS:
        logger.debug("No keywords available for detection")
        return []
        
    question_lower = question.lower()
    logger.debug(f"Lowercased question: {question_lower}")
    
    found_keywords = []
    for kw in KEYWORDS:
        kw_lower = kw.lower()
        if kw_lower in question_lower:
            logger.debug(f"Found keyword: {kw}")
            found_keywords.append(kw)  # Append original keyword to maintain case
        else:
            logger.debug(f"Keyword not found: {kw}")
    
    logger.info(f"Found {len(found_keywords)} keywords: {found_keywords}")
    return found_keywords
