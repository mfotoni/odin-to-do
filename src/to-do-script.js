import { UI } from "./domscript.js";
import {
  addTodo,
  getTodos,
  addProject,
  getProjects,
  Project,
  getCurrentProject,
  setCurrentProjectIndex,
  getCurrentProjectIndex,
  setCurrentTodoId,
  getCurrentTodoId,
  getCurrentTodo,
  updateTodo,
  deleteTodo,
  saveToStorage,
} from "./state.js";
import { isFuture, parse } from "date-fns";

export function makeTodo(title, description, dueDate, priority) {
  console.log(title, description, dueDate, priority);

  // date validation
  if (dueDate) {
    try {
      const inputDate = parse(dueDate, "dd/MM/yyyy", new Date());
      if (!isFuture(inputDate)) {
        alert("Due date must be in future");
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  const newTodo = {
    id: crypto.randomUUID(),
    title,
    description,
    dueDate,
    priority,
  };
  const current = getCurrentProject();

  if (current) {
    current.todoList.push(newTodo);
    saveToStorage();
  } else {
    addTodo(newTodo);
  }

  return newTodo;
}

export function createProject() {
  const title = UI.projectTitle.value.trim();
  if (!title) return;

  const newProject = new Project(title);
  addProject(newProject);

  setCurrentProjectIndex(getProjects().length - 1);

  UI.projectTitle.value = "";
  renderProjectsSidebar();

  return newProject;
}

export function renderProjectsSidebar() {
  const sideBarUl = document.getElementById("sidebar-ul");
  sideBarUl.innerHTML = "";

  const projectsArray = getProjects();
  const selected = getCurrentProjectIndex();

  projectsArray.forEach((project, index) => {
    const li = document.createElement("li");
    li.textContent = project.name;
    li.dataset.index = index;

    if (index === selected) {
      li.style.fontWeight = "700";
    }

    li.addEventListener("click", () => {
      setCurrentProjectIndex(index);
      renderProjectsSidebar();

      // renderizar as tasks do projeto selecionado
      renderProjectTasks();
    });

    sideBarUl.appendChild(li);
  });
}

export function renderProjectTasks() {
  const container = document.querySelector(".tasks-container");
  if (!container) return;

  let grid = container.querySelector("#project-tasks");
  if (!grid) {
    grid = document.createElement("div");
    grid.id = "project-tasks";
    container.appendChild(grid);
  }

  grid.innerHTML = "";

  const current = getCurrentProject();
  if (!current) {
    grid.textContent = "No project selected";

    return;
  }

  if (current.todoList.length === 0) {
    grid.textContent = "No tasks yet";

    return;
  }

  current.todoList.forEach((t) => {
    const card = document.createElement("li");
    card.className = "todo-card";
    card.dataset.todoId = t.id;

    const title = document.createElement("div");
    title.className = "todo-title";
    title.textContent = t.title;

    const desc = document.createElement("div");
    desc.className = "todo-desc";
    desc.textContent = t.description || "";

    const meta = document.createElement("div");
    meta.className = "todo-meta";
    const date = document.createElement("span");
    date.textContent = t.dueDate || "no date";
    const badge = document.createElement("span");
    const pr = (t.priority || "medium").toLowerCase();
    badge.className = `badge badge-${pr}`;
    badge.textContent = pr;

    meta.append(date, "•", badge);

    const actions = document.createElement("div");
    actions.className = "todo-actions";

    // button edit - open to-do details edit
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      if (
        getCurrentTodoId() === t.id &&
        document.querySelector("#todo-details")?.style.display !== "none"
      ) {
        closeTodoDetails();
      } else {
        setCurrentTodoId(t.id);
        renderTodoDetails();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.backgroundColor = "#dc2626";
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.borderRadius = "4px";
    deleteBtn.style.padding = "4px 8px";
    deleteBtn.style.fontSize = "11px";
    deleteBtn.style.cursor = "pointer";

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const deleted = deleteTodo(current, t.id);
      if (deleted) {
        renderProjectTasks();
      }
    });

    actions.append(editBtn, deleteBtn);
    card.append(title, desc, meta, actions);
    grid.appendChild(card);
  });
}

// panel to edit to-do
export function renderTodoDetails() {
  const container = document.querySelector(".tasks-container");
  if (!container) return;

  let panel = container.querySelector("#todo-details");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "todo-details";
    panel.style.marginTop = "12px";
    panel.style.padding = "12px";
    panel.style.border = "1px solid #e5e7eb";
    panel.style.borderRadius = "8px";
    panel.style.backgroundColor = "#f9fafb";

    container.appendChild(panel);
  }

  panel.style.display = "block";

  const project = getCurrentProject();
  const todo = getCurrentTodo(project);
  if (!todo) {
    panel.textContent = "Select a task to view details.";
    return;
  }

  panel.innerHTML = "";

  // header and close button
  const header = document.createElement("div");
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";
  header.style.marginBottom = "12px";

  const title = document.createElement("h3");
  title.textContent = "Edit Task";
  title.style.margin = "0";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  closeBtn.style.background = "none";
  closeBtn.style.border = "none";
  closeBtn.style.fontSize = "20px";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.padding = "4px 8px";
  closeBtn.addEventListener("click", closeTodoDetails);

  header.append(title, closeBtn);

  // edit fields
  const titleInput = input("text", todo.title);
  const descInput = input("text", todo.description || "");
  const dateInput = input("text", todo.dueDate || "");

  const prioritySelect = document.createElement("select");
  ["low", "medium", "high"].forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    if (todo.priority === p) opt.selected = true;
    prioritySelect.appendChild(opt);
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "8px";
  buttonContainer.style.marginTop = "12px";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.style.padding = "8px 16px";
  saveBtn.style.backgroundColor = "#3b82f6";
  saveBtn.style.color = "white";
  saveBtn.style.border = "none";
  saveBtn.style.borderRadius = "6px";
  saveBtn.style.cursor = "pointer";

  saveBtn.addEventListener("click", () => {
    updateTodo(project, todo.id, {
      title: titleInput.value.trim(),
      description: descInput.value.trim(),
      dueDate: dateInput.value.trim(),
      priority: prioritySelect.value,
    });

    renderProjectTasks();
    closeTodoDetails();
  });

  buttonContainer.append(saveBtn);
  panel.append(
    header,
    labelWrap("Title", titleInput),
    labelWrap("Description", descInput),
    labelWrap("Due Date", dateInput),
    labelWrap("Priority", prioritySelect),
    buttonContainer
  );
}

function input(type, value) {
  const el = document.createElement("input");
  el.type = type;
  el.value = value;
  return el;
}

function labelWrap(text, el) {
  const wrap = document.createElement("div");
  const label = document.createElement("label");

  label.textContent = text + ":";
  label.style.display = "block";
  label.style.fontWeight = "600";
  label.style.marginTop = "8px";
  wrap.append(label, el);

  return wrap;
}

function closeTodoDetails() {
  const panel = document.querySelector("#todo-details");
  if (panel) {
    panel.style.display = "none";
  }

  setCurrentTodoId(null);
}
