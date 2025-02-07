# Use a lightweight Python 3.11 base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy backend content to container
COPY backend /app

# Install dependencies without cache to reduce size
RUN pip install --no-cache-dir -r /app/requirements.txt

# Set working directory for application
WORKDIR /app/src

# Add debug script to verify environment variables
RUN echo '#!/bin/sh' > /app/verify_env.sh && \
    echo 'echo "Checking environment variables..."' >> /app/verify_env.sh && \
    echo 'echo "OPENAI_API_KEY exists: $(if [ -n \"$OPENAI_API_KEY\" ]; then echo YES; else echo NO; fi)"' >> /app/verify_env.sh && \
    echo 'echo "SUPABASE_URL exists: $(if [ -n \"$SUPABASE_URL\" ]; then echo YES; else echo NO; fi)"' >> /app/verify_env.sh && \
    echo 'echo "SUPABASE_KEY exists: $(if [ -n \"$SUPABASE_KEY\" ]; then echo YES; else echo NO; fi)"' >> /app/verify_env.sh && \
    chmod +x /app/verify_env.sh

# Set default environment variables
ENV PORT=8000 \
    PYTHONPATH=/app/src \
    ENVIRONMENT=development \
    PYTHONUNBUFFERED=1

# Command to start the application with environment export
CMD export OPENAI_API_KEY=${OPENAI_API_KEY} && \
    export SUPABASE_URL=${SUPABASE_URL} && \
    export SUPABASE_KEY=${SUPABASE_KEY} && \
    /app/verify_env.sh && \
    python -m uvicorn main:app --host 0.0.0.0 --port 8000

