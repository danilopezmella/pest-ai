# Usa una imagen ligera de Python 3.11
FROM python:3.11-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia el contenido de la carpeta "backend" al contenedor
COPY backend /app

# Instala las dependencias sin cache para reducir el tamaño
RUN pip install --no-cache-dir -r /app/requirements.txt

# Variable de entorno para el puerto
ENV PORT=8000

# Comando para iniciar la aplicación
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "${PORT}"] 

