let projectsArray = [];
let toDoArray = [];
let currentProjectIndex = null;

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
