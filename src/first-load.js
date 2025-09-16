import { addProject, Project, getProjects } from "./state.js";
import { loadFromStorage, saveToStorage } from "./state.js";

export function firstProjectLoad() {
  const loaded = loadFromStorage();
  if (loaded && getProjects().length > 0) {
    return { projectTitle: getProjects()[0]?.name || "Loaded" };
  }

  const projectTitle = "Default Project";
  const defaultProject = new Project(projectTitle);

  addProject(defaultProject);
  return { projectTitle };
}
