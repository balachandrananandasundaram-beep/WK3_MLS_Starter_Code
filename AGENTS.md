## Project Context

ThreadHive — social media app (communities, threads, discussions). Week 3: REST API without auth, using Node.js, Express 5, MongoDB/Mongoose, ESM modules.

The Node.js app lives in `threadhive-backend/`. The `models/` folder at the repo root contains reference Mongoose schemas.

## Build & Run

```bash
cd threadhive-backend
npm install
npm run dev      # nodemon main.js
npm start        # node main.js
npm run populate # seed the database
```

Entry flow: `main.js` → dotenv → `db.js` (Mongoose connect) → `server.js` → Express app in `src/app.js`.

## Architecture

```
threadhive-backend/
├── db.js               # connectToDB() / disconnectFromDB()
├── server.js           # startServer() / stopServer()
├── main.js             # Entry point
└── src/
    ├── app.js          # Express setup: cors, routes, errorHandler
    ├── controllers/    # subredditController.js, threadController.js
    ├── routes/         # subreddits.js, threads.js
    ├── models/         # Mongoose schemas
    ├── services/       # Business logic + DB operations
    └── scripts/        # populate_db.js
```

## API Reference

See [`threadhive-backend/resources/finalized-apis.md`](threadhive-backend/resources/finalized-apis.md) for the full endpoint list.  
A Postman collection is at `threadhive-backend/resources/threadhive-threads.postman_collection.json`.

Base URL: `http://localhost:3000/api`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/subreddits` | List all subreddits |
| POST | `/api/subreddits` | Create subreddit |
| GET | `/api/subreddits/:id` | Get subreddit by ID |
| GET | `/api/threads` | List all threads |
| GET | `/api/threads/:id` | Get thread by ID |
| POST | `/api/threads` | Create thread |
| PUT | `/api/threads/:id` | Update thread |
| DELETE | `/api/threads/:id` | Delete thread |

## Environment Variables

Create `threadhive-backend/.env`:

```
MONGODB_URI=mongodb://localhost:27017/threadhive
PORT=3000
NODE_ENV=development
```

Never hardcode connection strings or secrets.

## Code Style

- ES6+: async/await, arrow functions, destructuring
- ESM (`import`/`export`) — `package.json` has `"type": "module"`
- Controllers are thin: validate input, call service, send response
- Services own DB logic: query Mongoose models, throw errors on failure

## API Response Format

Success:
```json
{ "success": true, "data": { ... }, "message": "Optional" }
```

Error:
```json
{ "success": false, "message": "Error message" }
```

## What to Avoid

- CommonJS (`require`/`module.exports`)
- Hardcoded values — use env vars or constants
- Business logic in controllers — delegate to services
- Exposing internal error details to clients
