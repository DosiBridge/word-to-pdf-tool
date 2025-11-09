.PHONY: build up down logs restart clean

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

restart:
	docker-compose restart

clean:
	docker-compose down -v
	docker system prune -f

start: build up
	@echo "✅ Services are starting..."
	@echo "📍 Backend: http://localhost:8000"
	@echo "📍 Frontend: http://localhost:3000"
	@echo "📚 API Docs: http://localhost:8000/docs"

