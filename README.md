# Task-Reminder-System

A RESTful API for managing tasks with automated reminder notifications, built with **Node.js**, **TypeScript**, **Express**, **PostgreSQL**, and **Sequelize**.

---

## 🚀 Tech Stack

| Layer      | Technology                 |
| ---------- | -------------------------- |
| Runtime    | Node.js (LTS via nvm)      |
| Language   | TypeScript                 |
| Framework  | Express.js                 |
| ORM        | Sequelize v6               |
| Database   | PostgreSQL                 |
| Scheduler  | node-cron                  |
| API Docs   | Swagger UI (swagger-jsdoc) |
| Linting    | ESLint v10 (flat config)   |
| Formatting | Prettier                   |
| Git Hooks  | Husky + lint-staged        |

---

## 📁 Project Structure

```
task-reminder-system/
├── src/
│   ├── config/
│   │   ├── database.ts           # Sequelize connection
│   │   ├── swagger.ts            # Swagger/OpenAPI config
│   │   └── sequelize-config.js   # Sequelize CLI config
│   ├── controllers/
│   │   └── task.controller.ts    # Request handlers
│   ├── migrations/
│   │   └── xxx-create-tasks-table.js
│   ├── models/
│   │   └── task.model.ts         # Sequelize Task model
│   ├── routes/
│   │   └── task.routes.ts        # Routes + Swagger JSDoc
│   ├── services/
│   │   └── task.service.ts       # Business / DB logic
│   ├── utils/
│   │   ├── cron.ts               # Cron job registration
│   │   └── reminder.ts           # Reminder check logic
│   ├── app.ts                    # Express app setup
│   └── index.ts                  # Entry point
├── .env                          # Environment variables (not committed)
├── .eslint.config.js             # ESLint config
├── .prettierrc                   # Prettier config
├── .nvmrc                        # Node version lock
├── .gitignore
├── .sequelizerc                  # Sequelize CLI paths
├── tsconfig.json                 # TypeScript config
└── package.json
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager)
- Node.js LTS (via nvm)
- PostgreSQL 14+
- Git

---

## 🛠️ Setup & Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd task-reminder-system
```

### 2. Use correct Node version

```bash
nvm use
# Automatically picks version from .nvmrc
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_reminder
DB_USER=postgres
DB_PASSWORD=your_password
```

### 5. Create the PostgreSQL database

```bash
psql -U postgres
```

```sql
CREATE DATABASE task_reminder;
\q
```

### 6. Run database migrations

```bash
npx sequelize-cli db:migrate
```

---

## ▶️ Running the App

### Development (with auto-restart on file save)

```bash
npm run dev
```

### Production build

```bash
npm run build
npm start
```

---

## 📜 Available Scripts

| Script      | Command          | Description                               |
| ----------- | ---------------- | ----------------------------------------- |
| Development | `npm run dev`    | Run with ts-node-dev (auto-restart)       |
| Build       | `npm run build`  | Compile TypeScript → `dist/`              |
| Start       | `npm start`      | Run compiled production build             |
| Lint        | `npm run lint`   | Run ESLint on all `.ts` files             |
| Format      | `npm run format` | Auto-format all `.ts` files with Prettier |

---

## 📌 API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/health`        | Health check      |
| GET    | `/api/tasks`     | Get all tasks     |
| GET    | `/api/tasks/:id` | Get task by ID    |
| POST   | `/api/tasks`     | Create a new task |
| PUT    | `/api/tasks/:id` | Update a task     |
| DELETE | `/api/tasks/:id` | Delete a task     |

### Example — Create a Task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Team Meeting",
    "description": "Sprint review",
    "due_date": "2026-05-01T09:00:00Z"
  }'
```

### Example — Mark Task as Completed

```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"is_completed": true}'
```

---

## 📄 API Documentation (Swagger)

Interactive API docs are available at:

```
http://localhost:3000/api-docs
```

All endpoints can be tested directly from the browser.

---

## ⏰ Cron Job — Reminder System

A background cron job runs **every minute** and checks for tasks:

- Due within the next **24 hours**
- Not yet **completed**
- Reminder **not yet sent**

When found, it logs a reminder and marks `reminder_sent = true` to prevent duplicate alerts.

```
🕐 Running reminder check...
🔔 REMINDER: Task "Team Meeting" is due at 2026-05-01T09:00:00.000Z
✅ Sent 1 reminder(s)
```

> **For production:** Change the cron schedule in `src/utils/cron.ts` from `'* * * * *'` to `'0 9 * * *'` (daily at 9AM). Integrate an email/SMS provider (e.g. Nodemailer, Twilio) inside `src/utils/reminder.ts`.

---

## 🗄️ Database Migrations

| Command                                            | Description                |
| -------------------------------------------------- | -------------------------- |
| `npx sequelize-cli db:migrate`                     | Run all pending migrations |
| `npx sequelize-cli db:migrate:undo`                | Rollback last migration    |
| `npx sequelize-cli db:migrate:undo:all`            | Rollback all migrations    |
| `npx sequelize-cli migration:create --name <name>` | Create a new migration     |

> ⚠️ Never modify the database schema manually. Always create a new migration.

---

## 🔒 Git Hooks (Husky)

On every `git commit`, the following runs automatically via **lint-staged**:

- ESLint fixes on staged `.ts` files
- Prettier formats staged `.ts` files

This ensures no badly formatted or linted code ever enters the repository.

---

## 🔮 Suggested Future Improvements

- [ ] **Email notifications** — Integrate Nodemailer to send actual reminder emails instead of console logs
- [ ] **JWT Authentication** — Protect API routes with `passport-jwt`
- [ ] **User ownership** — Add a `users` table and associate tasks per user
- [ ] **Pagination** — Add `limit`/`offset` query params to `GET /api/tasks`
- [ ] **Input validation** — Use `zod` or `express-validator` for request body validation
- [ ] **Winston logging** — Replace `console.log` with structured file-based logging
- [ ] **Docker** — Add `Dockerfile` + `docker-compose.yml` for containerized local dev
- [ ] **Tests** — Add unit tests with `Jest` + `supertest` for API integration tests
- [ ] **Rate limiting** — Add `express-rate-limit` to protect public endpoints
- [ ] **Redis caching** — Cache task listings to reduce DB load

---

## 👤 Author

Built as part of the **Backend Development Learning Guide**
Stack: Node.js · TypeScript · Express · PostgreSQL · Sequelize · node-cron
