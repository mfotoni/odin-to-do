import { addProject, Project } from "./state.js";

export function firstProjectLoad() {
  const projectTitle = "Default Project";
  const defaultProject = new Project(projectTitle);

  addProject(defaultProject);
  return { projectTitle };
}
