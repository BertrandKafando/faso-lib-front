# FasoLib - Academic Document Sharing Platform

FasoLib is a full-stack platform for sharing and consulting academic documents in Burkina Faso.

## 🏗 Project Structure

- **/api-spring**: Spring Boot 3 Backend API.
- **/client-angular**: Angular 19 Frontend.

## 🚀 Quick Start with Docker (Recommended)

To launch the entire stack (PostgreSQL + API + Client):

```bash
docker-compose up --build
```

### 🗄️ Database Initialization

The project includes an automatic initialization service (`db-init`) that:

- Creates the `documents` and `users` tables.
- Inserts a default admin user (`admin` / `admin123`).
- Injects initial sample data.
- Located in `/script`.

- **Frontend**: `http://localhost:80` (or `http://localhost:4200` if running locally)
- **Backend API**: `http://localhost:8080/api`
- **Swagger Documentation**: `http://localhost:8080/swagger-ui/index.html`
- **Database Console**: `http://localhost:5432`

## 🛠 Manual Development Setup

If you prefer to run services individually:

### 1. Backend (Spring Boot)

Requires Java 17 and Maven.

```bash
cd api-spring
mvn spring-boot:run
```

### 2. Frontend (Angular)

Requires Node.js 20+.

```bash
cd client-angular
npm install
ng serve
```

## 📝 License

© 2024 FasoLibrairies. All rights reserved.
