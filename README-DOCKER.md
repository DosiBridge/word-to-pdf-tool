# Docker Setup

This project uses Docker Compose to run both the backend and frontend services.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Run in detached mode (background):**
   ```bash
   docker-compose up -d --build
   ```

3. **View logs:**
   ```bash
   docker-compose logs -f
   ```

4. **Stop services:**
   ```bash
   docker-compose down
   ```

## Services

- **Backend API**: http://localhost:8000
  - API Documentation: http://localhost:8000/docs
  - Health Check: http://localhost:8000/

- **Frontend**: http://localhost:3000

## Development

For development with hot reload:

```bash
# Backend with hot reload (if you modify docker-compose.yml to mount volumes)
docker-compose up --build
```

## Troubleshooting

1. **Port already in use:**
   ```bash
   # Stop any existing containers
   docker-compose down
   
   # Or change ports in docker-compose.yml
   ```

2. **Rebuild after dependency changes:**
   ```bash
   docker-compose build --no-cache
   docker-compose up
   ```

3. **View container logs:**
   ```bash
   docker-compose logs backend
   docker-compose logs frontend
   ```

4. **Access container shell:**
   ```bash
   docker-compose exec backend bash
   docker-compose exec frontend sh
   ```

