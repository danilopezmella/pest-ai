# Use a lightweight Python 3.11 base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy backend content to container
COPY backend /app

# Install dependencies without cache to reduce size
RUN pip install --no-cache-dir -r /app/requirements.txt

# Set default environment variables and pass through Railway variables
# Required environment variables that must be set in Railway:
# - OPENAI_API_KEY
# - SUPABASE_URL 
# - SUPABASE_KEY
ENV PORT=${PORT:-8000} \
    PYTHONPATH=/app/src \
    ENVIRONMENT=${ENVIRONMENT:-production} \
    DEBUG=${DEBUG:-False} \
    LOG_LEVEL=${LOG_LEVEL:-INFO} \
    OPENAI_API_KEY=${OPENAI_API_KEY} \
    SUPABASE_URL=${SUPABASE_URL} \
    SUPABASE_KEY=${SUPABASE_KEY}

# Set working directory for application
WORKDIR /app/src

# Command to start the application
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

