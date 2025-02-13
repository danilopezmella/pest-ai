# Use a lightweight Python 3.11 base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy backend content to container
COPY backend /app

# Copy keywords file to correct location
RUN mkdir -p /app/src/data && cp /app/data/keywords.csv /app/src/data/keywords.csv || true

# Move .env file to src directory if it exists
RUN if [ -f "/app/.env" ]; then mv /app/.env /app/src/.env; fi

# Install dependencies without cache to reduce size
RUN pip install --no-cache-dir -r /app/requirements.txt && \
    pip install --no-cache-dir google-generativeai==0.3.2

# Set working directory for application
WORKDIR /app/src

# Add debug script to verify environment variables
RUN echo '#!/bin/sh' > /app/verify_env.sh && \
    echo 'echo "Checking environment variables..."' >> /app/verify_env.sh && \
    echo 'echo "OPENAI_API_KEY exists: $(if [ -n \"$OPENAI_API_KEY\" ]; then echo YES; else echo NO; fi)"' >> /app/verify_env.sh && \
    echo 'echo "SUPABASE_URL exists: $(if [ -n \"$SUPABASE_URL\" ]; then echo YES; else echo NO; fi)"' >> /app/verify_env.sh && \
    echo 'echo "SUPABASE_KEY exists: $(if [ -n \"$SUPABASE_KEY\" ]; then echo YES; else echo NO; fi)"' >> /app/verify_env.sh && \
    echo 'echo "GEMINI_API_KEY exists: $(if [ -n \"$GEMINI_API_KEY\" ]; then echo \"YES - Value: ${GEMINI_API_KEY}\"; else echo \"NO - Please configure GEMINI_API_KEY in Railway\"; fi)"' >> /app/verify_env.sh && \
    chmod +x /app/verify_env.sh

# Set environment variables with defaults
ENV PORT=8000 \
    PYTHONPATH=/app/src \
    ENVIRONMENT=production \
    PYTHONUNBUFFERED=1 \
    OPENAI_API_KEY="" \
    SUPABASE_URL="" \
    SUPABASE_KEY="" \
    GEMINI_API_KEY=""

# Create entrypoint script that will override with actual values
RUN echo '#!/bin/sh' > /app/entrypoint.sh && \
    echo 'if [ -f ".env" ]; then' >> /app/entrypoint.sh && \
    echo '  echo "Loading .env file..."' >> /app/entrypoint.sh && \
    echo '  set -a' >> /app/entrypoint.sh && \
    echo '  . ./.env' >> /app/entrypoint.sh && \
    echo '  set +a' >> /app/entrypoint.sh && \
    echo 'fi' >> /app/entrypoint.sh && \
    echo 'if [ -z "$GEMINI_API_KEY" ]; then' >> /app/entrypoint.sh && \
    echo '  echo "ERROR: GEMINI_API_KEY is not set. Please configure it in Railway."' >> /app/entrypoint.sh && \
    echo '  exit 1' >> /app/entrypoint.sh && \
    echo 'fi' >> /app/entrypoint.sh && \
    echo 'python -c "import google.generativeai" || { echo "ERROR: Failed to import google.generativeai"; exit 1; }' >> /app/entrypoint.sh && \
    echo 'export OPENAI_API_KEY="${OPENAI_API_KEY}"' >> /app/entrypoint.sh && \
    echo 'export SUPABASE_URL="${SUPABASE_URL}"' >> /app/entrypoint.sh && \
    echo 'export SUPABASE_KEY="${SUPABASE_KEY}"' >> /app/entrypoint.sh && \
    echo 'export GEMINI_API_KEY="${GEMINI_API_KEY}"' >> /app/entrypoint.sh && \
    echo 'echo "Starting application with:"' >> /app/entrypoint.sh && \
    echo 'env | grep -E "OPENAI|SUPABASE|GEMINI|ENVIRONMENT"' >> /app/entrypoint.sh && \
    echo 'exec python -m uvicorn main:app --host 0.0.0.0 --port $PORT' >> /app/entrypoint.sh && \
    chmod +x /app/entrypoint.sh

# Use entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]

