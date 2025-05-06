import "./styles.css";
import {
  getProjects,
  getToDos,
  createProject,
  createDefaultProject,
  createToDo,
} from "./storage.js";
import { addAllEvents } from "./eventHandler.js";
import {
  populateProjects,
  populateProjectDropDown,
  populateToDoListContainer,
} from "./displayController.js";

createDefaultProject();
createProject("Test");

const userProjects = getProjects();

populateProjects(userProjects);
populateProjectDropDown(userProjects);

addAllEvents();

// const projectData = localStorage.getItem("projects");

// if (projectData !== null) {
//   projects = JSON.parse(projectData);
// } else {
// }

// const testProject = new Project("John");
// projects.push(testProject);

// localStorage.setItem("projects", JSON.stringify(projects));
