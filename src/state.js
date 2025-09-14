let projectsArray = [];
let toDoArray = [];
let currentProjectIndex = null;
let currentTodoId = null;

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
  if (t) Object.assign(t, partial);
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
}

export function getTodos() {
  return toDoArray;
}

export function setTodos(todos) {
  toDoArray = todos;
}

export function addTodo(todo) {
  toDoArray.push(todo);
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
