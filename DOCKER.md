# Docker Setup Guide

## Prerequisites

- Docker Desktop installed
- Docker Compose included

## Run Docker Desktop
_If you have a recent version of Docker Desktop installed, you can use the built-in desktop CLI plugin on all platforms._

```bash
# Start: 
docker desktop start

# Stop: 
docker desktop stop

# Restart: 
docker desktop restart

# Status: 
docker desktop status
```

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