# Multi-Stage Dockerfile for GigPulse Autonomous Financial OS
# Stage 1: Python AI & ML Backend Runtime
FROM python:3.11-slim AS backend

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install python requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application backend, core models and frontend assets
COPY backend/ ./backend/
COPY src/ ./src/
COPY frontend/ ./frontend/
COPY index.html .

EXPOSE 8000 3000

# Default entrypoint starts the high-performance FastAPI treasury & agent service
CMD ["uvicorn", "backend.server:app", "--host", "0.0.0.0", "--port", "8000"]
