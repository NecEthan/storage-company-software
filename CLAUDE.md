# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

```
/
├── frontend/   # React 18 + Vite SPA
└── backend/    # Node.js + Express API server
```

## Commands

**From the root** (runs both together):
```bash
npm run dev           # start frontend + backend concurrently
npm run install:all   # install deps for both
```

**Frontend** (`cd frontend`):
```bash
npm run dev      # Vite dev server → http://localhost:5173
npm run build    # production build
npm run preview  # preview production build
```

**Backend** (`cd backend`):
```bash
cp .env.example .env   # first-time setup
npm install
npm run dev            # node --watch → http://localhost:3001
npm start              # production start
```

## Architecture

### Frontend (`frontend/`)

React 18 + Vite SPA. All data is currently in-memory (no persistence — resets on page refresh). State lives in `App.jsx` and is passed down via props.

**Pages** (switched via `activePage` state in `App.jsx`):
- `dashboard` — form + table view
- `sitemap` — visual overlay on a site plan image

**Data flow:**
1. `FormPanel` collects input → calls `onSubmit` in `App.jsx`
2. `App.jsx` appends to `rows` and sets `createdData`
3. `OutputPanel` shows confirmation + static document list
4. `TableDashboard` renders `rows` filtered by `search`
5. `ContainerDetail` is a slide-in modal for a single record

**SiteMap** (`src/components/SiteMap.jsx`) renders `src/assets/siteplan.png` as a background and positions absolutely-placed `<button>` hotspots over each container using pixel coordinates defined in `HOTSPOTS`. Blue overlay = occupied, green = available. Container IDs are normalised (e.g. `"A1"` → `"A001"`) before lookup.

**Container record shape:**
```js
{ id, container, customer, date, status, hasDocs, phone, email, padlock, fob }
```

**Styling:** Tailwind CSS. Custom classes `.field-input`, `.btn-primary`, `.btn-secondary` in `src/index.css`.

### Backend (`backend/`)

Express server with CORS configured for the frontend origin.

```
backend/src/
├── server.js        # entry point — Express setup, middleware, /health
└── routes/
    └── api.js       # /api/containers  CRUD (currently in-memory, no DB yet)
```

The backend currently uses an in-memory array as a placeholder. Replace with a real database when ready.
