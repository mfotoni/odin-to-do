let projectsArray = [];
let toDoArray = [];

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
