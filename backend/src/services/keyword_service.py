import logging
from utils.csv_loader import load_keywords
import re

# Configure logging
logger = logging.getLogger(__name__)

# Load keywords once to avoid reloading for every request
logger.info("Loading keywords from CSV file...")
KEYWORDS = load_keywords("data/keywords.csv")
logger.info(f"Loaded {len(KEYWORDS)} keywords")

def detect_keywords(question: str):
    """Detects if the question contains any predefined keywords."""
    logger.debug(f"Detecting keywords in question: {question}")
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
    return found_keywords if found_keywords else None
