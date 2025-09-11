import "./styles.css";
import {
  makeTodo,
  createProject,
  renderProjectsSidebar,
  renderProjectTasks,
  renderTodoDetails,
} from "./to-do-script.js";
import { setCurrentTodoId, getCurrentProject } from "./state.js";
import { firstProjectLoad } from "./first-load.js";
import { UI } from "./domscript.js";

// call dom manipulation modulo to control UI

// click event modulo here for to-do and project creations
// makeTodo("teste comer cu", "comer cu de curioso", "amanha", "high");

firstProjectLoad();
renderProjectsSidebar();
renderProjectTasks();

UI.showTaskButton.addEventListener("click", () => {
  console.log("clicou no botão");
  UI.newTaskForm.classList.toggle("hidden");
});

UI.projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createProject();
  renderProjectTasks();
});

UI.newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = UI.titleTask.value.trim();
  if (!title) return;
  const descript = UI.descriptionTask.value.trim();
  const priori = UI.getPriority();
  const date = document.getElementById("date-task").value.trim();

  const todo = makeTodo(title, descript, date, priori);
  renderProjectTasks();
  if (!todo) {
    setCurrentTodoId(todo.id);
    renderTodoDetails();
  }

  UI.newTaskForm.classList.add("hidden");
  UI.titleTask.value = "";
  UI.descriptionTask.value = "";
});
