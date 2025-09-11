// import { firstProjectLoad } from "./first-load.js";

export const UI = (function () {
  const tasksContainer = document.querySelector(".tasks-container");
  // const newTaskForm = document.querySelector(".todo-form");
  const titleTask = document.getElementById("title-task");
  const descriptionTask = document.getElementById("description-task");
  const submitTodoBtn = document.getElementById("submit-button");
  const showTaskButton = document.getElementById("new-task");
  const newTaskForm = document.querySelector(".todo-form");
  // projects
  const projectForm = document.getElementById("new-project-form");
  const projectTitle = document.getElementById("new-project-title");
  const addProjectBtn = document.querySelector("#add-project-btn");

  const getPriority = () =>
    document.querySelector('input[name="priority"]:checked')?.value || null;

  return {
    tasksContainer,
    addProjectBtn,
    projectForm,
    projectTitle,
    titleTask,
    descriptionTask,
    getPriority,
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
