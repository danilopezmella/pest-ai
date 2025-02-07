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

# Set environment variables with defaults
ENV PORT=8000 \
    PYTHONPATH=/app/src \
    ENVIRONMENT=production \
    PYTHONUNBUFFERED=1 \
    OPENAI_API_KEY="" \
    SUPABASE_URL="" \
    SUPABASE_KEY=""

# Create entrypoint script that will override with actual values
RUN echo '#!/bin/sh' > /app/entrypoint.sh && \
    echo 'export OPENAI_API_KEY="${OPENAI_API_KEY}"' >> /app/entrypoint.sh && \
    echo 'export SUPABASE_URL="${SUPABASE_URL}"' >> /app/entrypoint.sh && \
    echo 'export SUPABASE_KEY="${SUPABASE_KEY}"' >> /app/entrypoint.sh && \
    echo 'echo "Starting application with:"' >> /app/entrypoint.sh && \
    echo 'env | grep -E "OPENAI|SUPABASE|ENVIRONMENT"' >> /app/entrypoint.sh && \
    echo 'exec python -m uvicorn main:app --host 0.0.0.0 --port $PORT' >> /app/entrypoint.sh && \
    chmod +x /app/entrypoint.sh

# Use entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]

