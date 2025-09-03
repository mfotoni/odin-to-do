import { addProject } from "./state.js";

export function firstProjectLoad() {
  let projectsArray = [];
  let projectTitle = "Default Project";

  projectsArray.push({ projectTitle });
  console.log(projectsArray);

  return { projectsArray, projectTitle };
}
