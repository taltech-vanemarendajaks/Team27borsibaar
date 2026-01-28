# Docker Setup Guide

## Prerequisites

- Docker Desktop installed
- Docker Compose included

## Quick Start

```bash
# Start all services
docker compose up

# Start in background
docker compose up -d

# Stop services
docker compose down

# Services

- postgres: PostgreSQL 17 database on port 5432
- backend: Spring Boot application on port 8080

Troubleshooting

Port already in use: Change ports in docker-compose.yaml
Database connection failed: Check .env credentials
```