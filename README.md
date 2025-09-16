## To‑Do List

A lightweight projects-and-tasks web app built with modular JavaScript and object‑oriented design, bundled with Webpack. Create projects, add tasks with priorities and due dates, edit or delete tasks, and persist data locally in the browser.

### Features

- **Projects**: create and switch between multiple projects.
- **Tasks**: title, description, priority (low/medium/high), optional due date.
- **Edit/Delete**: inline details panel to edit; quick delete action.
- **Persistence**: data stored in `localStorage` under `todoAppData`.

### Tech Stack

- **JavaScript (ES Modules)**, **HTML**, **CSS**
- **Object‑Oriented Design** for domain models and state management
- **Webpack 5** (with dev server, HTML template plugin, CSS loaders)
- **date-fns** for date parsing/validation

### Getting Started

Prerequisites:

- Node.js 18+ and npm

Install dependencies:

```bash
npm install
```

Run in development (with live reload):

```bash
npx webpack serve
```

Build for production (outputs to `dist/`):

```bash
npx webpack --mode production
```

Open the app:

- Dev server will print the local URL (commonly `http://localhost:8080`).
- Production build in `dist/` can be served by any static file server.

### Scripts (optional)

You can add convenience scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "webpack serve",
    "build": "webpack --mode production"
  }
}
```

### Architecture

- **Domain Model (OOP)**

  - `Project` class encapsulates a project and its `todoList` (array of to‑do items).
  - To‑do items are plain objects with `id`, `title`, `description`, `dueDate`, `priority`.

- **State & Persistence** (`src/state.js`)

  - Centralized state for `projectsArray`, `toDoArray`, current selections.
  - CRUD utilities: add/update/delete to‑dos, add projects, setters/getters.
  - `saveToStorage()` and `loadFromStorage()` sync state with `localStorage`.

- **UI Rendering** (`src/to-do-script.js`)

  - Renders sidebar projects, task grid, and the task details edit panel.
  - Validates due dates using `date-fns` (`dd/MM/yyyy`, future‑date check).
  - Wires edit/save/delete actions to state and triggers re‑render.

- **DOM Access Layer** (`src/domscript.js`)

  - Centralized selectors for form fields and buttons used by the UI logic.

- **Bootstrap** (`src/index.js`)

  - Loads initial data, creates a default project on first run, and binds events.

- **Initial Load** (`src/first-load.js`)

  - Creates a default project if none exists, or restores from storage.

- **Bundling**
  - `webpack.config.js` uses `html-webpack-plugin` with `src/template.html` and loads CSS via `style-loader` and `css-loader`.

### Project Structure

- `src/index.js`: app bootstrap and event wiring
- `src/to-do-script.js`: rendering for projects, task cards, and edit panel
- `src/state.js`: OOP model (`Project`) and state + localStorage
- `src/domscript.js`: DOM getters/utilities for UI elements
- `src/first-load.js`: initial data load and default project creation
- `src/template.html`: HTML template consumed by Webpack
- `src/styles.css`: layout and component styles
- `webpack.config.js`: development build configuration

### Usage

- Use the sidebar to create/select projects.
- Click “Add new Task” to toggle the task form.
- Enter due date as `dd/MM/yyyy` (e.g., `25/12/2025`); past dates are rejected.
- Task cards show title, description, due date, and a priority badge.
- Click “Edit” to modify fields; click “Save” to persist.
- Click “Delete” to remove a task from the current project.

### Data & Reset

- Data is stored in `localStorage` under `todoAppData`.
- Reset by clearing site data or running in DevTools:

```js
localStorage.removeItem("todoAppData");
```

### License

This project is released under the MIT License. See `LICENSE` for details.
