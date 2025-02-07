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
ENV OPENAI_API_KEY=$OPENAI_API_KEY \
    SUPABASE_URL=$SUPABASE_URL \
    SUPABASE_KEY=$SUPABASE_KEY \
    PORT=$PORT \
    PYTHONPATH=/app/src \
    ENVIRONMENT=production \
    DEBUG=False \
    LOG_LEVEL=INFO

# Set working directory for application
WORKDIR /app/src

# Add debug script to verify environment variables
RUN echo '#!/bin/sh' > /app/verify_env.sh && \
    echo 'echo "Checking environment variables..."' >> /app/verify_env.sh && \
    echo 'echo "OPENAI_API_KEY exists: $(if [ -n \"$OPENAI_API_KEY\" ]; then echo YES; else echo NO; fi)"' >> /app/verify_env.sh && \
    echo 'echo "SUPABASE_URL exists: $(if [ -n \"$SUPABASE_URL\" ]; then echo YES; else echo NO; fi)"' >> /app/verify_env.sh && \
    echo 'echo "SUPABASE_KEY exists: $(if [ -n \"$SUPABASE_KEY\" ]; then echo YES; else echo NO; fi)"' >> /app/verify_env.sh && \
    chmod +x /app/verify_env.sh

# Run verification script before starting the application
CMD /app/verify_env.sh && python -m uvicorn main:app --host 0.0.0.0 --port 8000

