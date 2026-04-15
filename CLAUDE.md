# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (Vite with hot reload)
npm run build     # Production build
npm run preview   # Preview production build locally
```

No test or lint scripts are configured.

## Architecture

React 18 + Vite SPA for managing storage facility customers and containers. All data is in-memory (no backend, no persistence — data resets on page refresh).

**State lives in `App.jsx`** and is passed down via props:
- `rows` — array of container/customer records
- `showForm` — toggles the FormPanel
- `selectedContainer` — drives the ContainerDetail modal
- `search` — filters the TableDashboard

**Data flow:**
1. `FormPanel` collects input → calls `onSubmit` in `App.jsx`
2. `App.jsx` appends to `rows` and sets `createdData`
3. `OutputPanel` shows confirmation + a static document list (not actually generated)
4. `TableDashboard` renders `rows` filtered by `search`
5. `ContainerDetail` is a slide-in modal showing a single record

**Container record shape:**
```js
{
  id: number,        // Date.now()
  container: string, // e.g. "A001"
  customer: string,
  date: string,      // DD/MM/YY
  status: string,    // "Active" | "Empty"
  hasDocs: boolean,
  phone: string,
  email: string,
  padlock: string,
  fob: string
}
```

**Styling:** Tailwind CSS utility classes. Custom classes `.field-input`, `.btn-primary`, `.btn-secondary` are defined in `src/index.css`.
