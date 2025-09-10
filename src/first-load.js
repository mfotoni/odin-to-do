import { addProject, Project } from "./state.js";

export function firstProjectLoad() {
  const projectTitle = "Test Project";
  const defaultProject = new Project(projectTitle);

  addProject(defaultProject);
  return { projectTitle };
}
