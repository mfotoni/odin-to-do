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
  getCurrentTodo,
  updateTodo,
} from "./state.js";

export function makeTodo(title, description, dueDate, priority) {
  console.log(title, description, dueDate, priority);

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
  } else {
    addTodo(newTodo);
  }

  console.log(getTodos());
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
  let list = container.querySelector("#project-tasks");
  if (!list) {
    list = document.createElement("ul");
    list.id = "project-tasks";
    container.appendChild(list);
  }

  list.innerHTML = "";

  const current = getCurrentProject();
  if (!current) {
    // const li = document.createElement("li");
    // li.textContent = "No project Selected";
    // list.appendChild(li);
    list.textContent = "No project selected";

    return;
  }

  if (current.todoList.length === 0) {
    // const li = document.createElement("li");
    // li.textContent = "No tasks yet";
    // list.appendChild(li);
    list.textContent = "No tasks yet";

    return;
  }

  current.todoList.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = `${t.title} | ${t.dueDate || "no date"} | ${
      t.priority || "-"
    }`;
    li.dataset.todoId = t.id;
    li.style.cursor = "pointer";
    li.addEventListener("click", () => {
      setCurrentTodoId(t.id);
      renderTodoDetails();
    });

    list.appendChild(li);
  });
}

// painel pra ver/editar to-do
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

    container.appendChild(panel);
  }

  const project = getCurrentProject();
  const todo = getCurrentTodo(project);
  if (!todo) {
    panel.textContent = "Select a task to view details.";
    return;
  }

  panel.innerHTML = "";

  const title = input("text", todo.title);
  const desc = input("text", todo.description || "");
  const date = input("text", todo.dueDate || "");

  const priority = document.createElement("select");
  ["low", "medium", "high"].forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    if (todo.priority === p) opt.selected = true;
    priority.appendChild(opt);
  });

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.style.marginTop = "12px";
  saveBtn.addEventListener("click", () => {
    updateTodo(project, todo.id, {
      title: title.value.trim(),
      description: desc.value.trim(),
      dueDate: date.value.trim(),
      priority: priority.value,
    });

    renderProjectTasks();
    renderTodoDetails();
  });

  panel.append(
    labelWrap("Title", title),
    labelWrap("Description", desc),
    labelWrap("Due Date", date),
    labelWrap("Priority", priority),
    saveBtn
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

// UI.projectForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   createProject();
// });

// UI.showTaskButton.addEventListener("click", () => {
//   console.log("clicou no botão");
//   UI.newTaskForm.classList.toggle("hidden");
// });

// Project class moved to state.js and imported above

// class TodoManager {
//   markComplete() {}
//   updatePriority() {}

//   // adicionar um array de projetos
// }

// Pense em um ProjectManager que é responsável apenas por operações relacionadas a projetos: criar, deletar, encontrar, listar projetos. Ele mantém o array de projetos e conhece todas as operações que você pode fazer com projetos, mas não se preocupa com como os to-dos individuais funcionam.

// Paralelamente, cada projeto individual pode ter sua própria lógica para gerenciar seus to-dos. A classe Project seria responsável por adicionar, remover e organizar to-dos dentro de si mesma. Ela não precisa saber como outros projetos funcionam ou como a aplicação toda está estruturada.
