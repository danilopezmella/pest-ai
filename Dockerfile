# Use a lightweight Python 3.11 base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy backend content to container
COPY backend /app

# Install dependencies without cache to reduce size
RUN pip install --no-cache-dir -r /app/requirements.txt

# Set default environment variables
# Note: In production, you MUST set these via Railway environment variables:
# - OPENAI_API_KEY
# - SUPABASE_URL
# - SUPABASE_KEY
ENV PORT=8000 \
    PYTHONPATH=/app/src \
    ENVIRONMENT=production \
    DEBUG=False \
    LOG_LEVEL=INFO

# Set working directory for application
WORKDIR /app/src

# Command to start the application
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

