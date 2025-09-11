import "./styles.css";
import { makeTodo } from "./to-do-script.js";
// import { firstProjectLoad } from "./first-load.js";
import { UI } from "./domscript.js";
import { createProject, renderProjectsSidebar } from "./to-do-script.js";

// call dom manipulation modulo to control UI

// click event modulo here for to-do and project creations
// makeTodo("teste comer cu", "comer cu de curioso", "amanha", "high");

renderProjectsSidebar();

UI.showTaskButton.addEventListener("click", () => {
  console.log("clicou no botão");
  UI.newTaskForm.classList.toggle("hidden");
});

UI.projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createProject();
});

UI.newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = UI.titleTask.value.trim();
  if (!title) return;
  const descript = UI.descriptionTask.value.trim();
  const priori = UI.getPriority();
  const date = document.getElementById("date-task").value.trim();

  makeTodo(title, descript, date, priori);
  UI.newTaskForm.classList.add("hidden");
  UI.titleTask.value = "";
  UI.descriptionTask.value = "";
});
