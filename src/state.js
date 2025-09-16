let projectsArray = [];
let toDoArray = [];
let currentProjectIndex = null;
let currentTodoId = null;

const STORAGE_KEY = "todoAppData";

export function saveToStorage() {
  const data = { projects: projectsArray, todos: toDoArray };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Erro ao salvar no localStorage", e);
  }
}

export function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return false;
    const data = JSON.parse(saved);
    projectsArray = Array.isArray(data.projects) ? data.projects : [];
    toDoArray = Array.isArray(data.todos) ? data.todos : [];
    currentProjectIndex = projectsArray.length ? 0 : null;
    return true;
  } catch (e) {
    console.error("Erro ao carregar do localStorage", e);
    return false;
  }
}

export function setCurrentTodoId(id) {
  currentTodoId = id;
}

export function getCurrentTodo(project) {
  if (!project || !currentTodoId) return null;
  return project.todoList.find((t) => t.id === currentTodoId);
}

export function getCurrentTodoId() {
  return currentTodoId;
}

export function updateTodo(project, id, partial) {
  if (!project) return;
  const t = project.todoList.find((x) => x.id === id);
  if (t) {
    Object.assign(t, partial);
    saveToStorage();
  }
}

export class Project {
  constructor(name) {
    this.name = name;
    this.todoList = [];
  }
}

export function getProjects() {
  return projectsArray;
}

export function setProjects(projects) {
  projectsArray = projects;
}

export function addProject(project) {
  projectsArray.push(project);
  if (currentProjectIndex === null) currentProjectIndex = 0;
  saveToStorage();
}

export function getTodos() {
  return toDoArray;
}

export function setTodos(todos) {
  toDoArray = todos;
}

export function addTodo(todo) {
  toDoArray.push(todo);
  saveToStorage();
}

export function getCurrentProjectIndex() {
  return currentProjectIndex;
}

export function setCurrentProjectIndex(index) {
  if (index >= 0 && index < projectsArray.length) {
    currentProjectIndex = index;
  }
}

export function getCurrentProject() {
  if (currentProjectIndex === null) return null;
  return projectsArray[currentProjectIndex] || null;
}

export function deleteTodo(project, id) {
  if (!project) return false;
  const index = project.todoList.findIndex((t) => t.id === id);
  if (index !== -1) {
    project.todoList.splice(index, 1);
    saveToStorage();
    return true;
  }
  return false;
}

// local storage
// export function loadFromStorage() {
//     const saved = localStorage.getItem('todoAppData');
//     if (saved) {
//         const data = JSON.parse(saved);
//         projectsArray = data.projects || [];
//         toDoArray = data.todos || [];
//     }
// }

// export function saveToStorage() {
//     const data = { projects: projectsArray, todos: toDoArray };
//     localStorage.setItem('todoAppData', JSON.stringify(data));
// }
