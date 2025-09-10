import "./styles.css";
import { makeTodo } from "./to-do-script.js";
// import { firstProjectLoad } from "./first-load.js";
import { InitialDomScript } from "./domscript.js";
import { UI } from "./domscript.js";
import { createProject, renderProjectsSidebar } from "./to-do-script.js";

// call dom manipulation modulo to control UI
InitialDomScript();

// click event modulo here for to-do and project creations
makeTodo("teste comer cu", "comer cu de curioso", "amanha", "high");

renderProjectsSidebar();

UI.showTaskButton.addEventListener("click", () => {
  console.log("clicou no botão");
  UI.newTaskForm.classList.toggle("hidden");
});

UI.projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createProject();
});
