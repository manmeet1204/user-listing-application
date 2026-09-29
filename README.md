# User Listing Application

A full-stack CRUD application for listing and managing users. Backend: Java 21 / Spring Boot / MySQL. Frontend: React / TypeScript / Vite.

## Tech stack

- **Backend:** Java 21, Spring Boot 4.1.1, Spring Data JPA, MySQL, JUnit 5
- **Frontend:** React 19, TypeScript, Vite, React Router, Axios, Vitest, React Testing Library

## Prerequisites

- Java 21
- Node.js and npm
- A running MySQL server

## Database setup

Create the schema (no other manual setup needed — tables are created automatically on first run):

```sql
CREATE DATABASE user_listing_db;
```

On first startup, the backend automatically seeds 8 example users. This only happens once — restarting the app does not duplicate them or reset your data, which is also how persistence is proven.

## Environment variables

Real credentials are never committed to this repository.

**Backend:** copy `backend/src/main/resources/application-local.properties.example` to `application-local.properties` (same folder) and fill in your own MySQL password:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/user_listing_db
spring.datasource.username=root
spring.datasource.password=your-mysql-password-here
```

This file is gitignored. The backend also needs the `local` Spring profile active to pick it up (see below).

**Frontend:** `frontend/.env` already contains the backend's address:

```
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

## Running the app

**Backend** (from the `backend/` folder):

```bash
cd backend
# Windows PowerShell:
$env:SPRING_PROFILES_ACTIVE="local"
.\mvnw.cmd spring-boot:run
# macOS/Linux:
export SPRING_PROFILES_ACTIVE=local
./mvnw spring-boot:run
```

Runs on `http://localhost:8080`.

**Frontend** (from the `frontend/` folder, in a separate terminal):

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`. Open `http://localhost:5173/users` in a browser.

## API base URL

`http://localhost:8080/api/v1/users` — supports `GET`, `POST`, `PUT /{id}`, `DELETE /{id}`.

## Running tests

- Backend: `cd backend && .\mvnw.cmd test` (or `./mvnw test` on macOS/Linux)
- Frontend: `cd frontend && npm test`

## Architecture

When the create-user form is submitted in the React app, the `CreateUserForm` component calls the frontend's API module, which sends a `POST` request with the name and email as JSON to `/api/v1/users`. Spring's `UserController` receives it, and `@Valid` runs Bean Validation on the incoming `CreateUserRequest` DTO before the controller method body even executes, rejecting a blank name or invalid email with a `400` response. If validation passes, the controller calls `UserService.createUser()`, which first checks `UserRepository.existsByEmail()` to enforce the uniqueness rule, throwing a `DuplicateEmailException` if the email is already taken. Otherwise, the service builds a new `User` entity, applies default values, and calls `UserRepository.save()`, which Spring Data JPA turns into a Hibernate-generated SQL `INSERT` against MySQL. The service maps the saved entity into a `UserResponse` DTO — the entity itself is never returned directly — and the controller wraps it in a `ResponseEntity` with a `201` status. Any exception raised along the way is caught by a single `GlobalExceptionHandler`, which converts it into the correct HTTP status and a JSON error message instead of a generic `500`. Back in the browser, Axios resolves the response, the frontend re-fetches the full user list to keep the UI in sync, and React re-renders the table with the new row.

## Screenshots

See `screenshots/` — populated list, error state, and empty state.
