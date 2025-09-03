import { UI } from "./domscript.js";

let toDoArray = [];
let projectsArray = [];

export function makeTodo(title, description, dueDate, priority) {
  console.log(title, description, dueDate, priority);
  toDoArray.push({ title, description, dueDate, priority });
  console.log(toDoArray);
  return { title, description, dueDate, priority };
}

// class CreateTodo {
//   constructor(title, description, dueDate, priority) {
//     this.title = title;
//     this.description = description;
//     this.dueDate = dueDate;
//     this.priority = priority;

//     // adicionar id unico
//   }
// }

export function createProject() {
  const title = UI.projectTitle.value.trim();
  // todos = [];
  if (!title) return;

  const newProject = new Project(title);
  projectsArray.push(newProject);

  UI.projectTitle.value = "";

  renderProjectsSidebar();

  return newProject;
}

export function renderProjectsSidebar() {
  const sideBarUl = document.getElementById("sidebar-ul");
  sideBarUl.innerHTML = "";

  projectsArray.forEach((project) => {
    const li = document.createElement("li");
    li.textContent = project.name;
    sideBarUl.appendChild(li);
  });
}

UI.projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createProject();
});

class Project {
  constructor(name) {
    this.name = name;
    this.todoList = [];
  }
}

// class TodoManager {
//   markComplete() {}
//   updatePriority() {}

//   // adicionar um array de projetos
// }

// Pense em um ProjectManager que é responsável apenas por operações relacionadas a projetos: criar, deletar, encontrar, listar projetos. Ele mantém o array de projetos e conhece todas as operações que você pode fazer com projetos, mas não se preocupa com como os to-dos individuais funcionam.

// Paralelamente, cada projeto individual pode ter sua própria lógica para gerenciar seus to-dos. A classe Project seria responsável por adicionar, remover e organizar to-dos dentro de si mesma. Ela não precisa saber como outros projetos funcionam ou como a aplicação toda está estruturada.
