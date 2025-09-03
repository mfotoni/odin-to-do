import { firstProjectLoad } from "./first-load.js";

export function InitialDomScript() {
  const contentDiv = document.querySelector(".content");
  const heading = document.createElement("h1");

  heading.textContent = "To-do Odin";
  contentDiv.appendChild(heading);

  // DOM for first project load
  const projectInfoDiv = document.createElement("div");
  projectInfoDiv.textContent = firstProjectLoad().projectTitle;
  contentDiv.appendChild(projectInfoDiv);
}

// toggle new task form
// export function showTaskForm(){

// }

export const UI = (function () {
  // const newTaskForm = document.querySelector(".todo-form");

  const titleTask = document.getElementById("title-task");
  const descriptionTask = document.getElementById("description-task");

  const priority = document.querySelector('input[name="priority"]:checked');

  const submitTodoBtn = document.getElementById("submit-button");

  const showTaskButton = document.getElementById("new-task");
  const newTaskForm = document.querySelector(".todo-form");

  // projects
  const projectForm = document.getElementById("new-project-form");
  const projectTitle = document.getElementById("new-project-title");
  const addProjectBtn = document.querySelector("#add-project-btn");

  return {
    addProjectBtn,
    projectForm,
    projectTitle,
    titleTask,
    descriptionTask,
    priority,
    submitTodoBtn,
    showTaskButton,
    newTaskForm,
  };
})();

// const showTaskButton = document.getElementById("new-task");
// const newTaskForm = document.querySelector(".todo-form");

// UI.showTaskButton.addEventListener("click", () => {
//   console.log("clicou no botão");
//   UI.newTaskForm.classList.toggle("hidden");
// });
