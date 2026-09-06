# SentinelOps Lite

Cyber Security Incident Management — full-stack SOC dashboard with Gemini AI.

## Structure

```
sentinelops/
├── frontend/   React + Vite + Bootstrap + Axios (http://localhost:5173)
└── backend/    Java Spring Boot + JWT + MySQL + Flyway (http://localhost:8484)
```

## Prerequisites

- Node 20+, JDK 21+, MySQL 8 (database `sentinelops`)
- A Google Gemini API key

## Run with Docker (recommended for deploy)

```bash
# set secrets (powershell: $env:DB_PASSWORD="..."; bash: export DB_PASSWORD=...)
docker compose up --build -d
```

| Service  | URL                            |
|----------|--------------------------------|
| Frontend | http://localhost:8080          |
| Backend  | http://localhost:8484/api      |
| Swagger  | http://localhost:8484/swagger-ui.html |

Flyway auto-creates the schema on first boot. MySQL data persists in the
`mysql-data` volume. Stop local dev servers first if ports 3306/8484 clash.

Env knobs: `DB_PASSWORD` (required-ish), `JWT_SECRET`, `GEMINI_API_KEY`,
`VITE_API_URL` (defaults to `http://localhost:8484/api`).

## Run backend (local dev)

```bash
cd backend
# configure DB + key via env vars (or edit src/main/resources/application.properties)
./mvnw spring-boot:run
```

Swagger: http://localhost:8484/swagger-ui.html

## Run frontend

```bash
cd frontend
npm install
npm run dev
```

App: http://localhost:5173 (API base override: `VITE_API_URL`)

## Roles

Registering creates an `ENGINEER`. Promote to `ADMIN` in MySQL, then log out/in:

```sql
USE sentinelops;
UPDATE users SET role_id = (SELECT id FROM roles WHERE name='ADMIN')
WHERE email = 'you@email.com';
```

ADMIN unlocks incident edit/delete + audit logs.

## Features

- JWT auth, BCrypt passwords, role-based access (ADMIN / ENGINEER)
- Incident CRUD, search/filter, status lifecycle
- Dashboard posture, heat index, severity mix, 7-day activity
- Gemini AI analyzer (`POST /api/ai/analyze`) + assistant (`GET /api/ai/ask`)
- ADMIN-only audit trail, global exception handling, CORS for Vite dev server
