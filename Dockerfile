# Usa una imagen oficial de Python 3.11
FROM python:3.11-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY backend/requirements.txt backend/requirements.txt

# Instala las dependencias
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copia el resto del código
COPY backend backend/

# Comando para iniciar la aplicación
CMD ["python", "-m", "uvicorn", "backend.src.main:app", "--host", "0.0.0.0", "--port", "8000"] 