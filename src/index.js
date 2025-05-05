import "./styles.css";
import { Project } from "./project.js";
import { ToDo } from "./todo.js";
import { displayController } from "./displayController.js";

let projects = [];
let todos = [];

const createProject = function (name) {
  const newProject = new Project(name);
  projects.push(newProject);
};

const createDefaultProject = function () {
  if (projects.length === 0) {
    const newProject = new Project("Default");
    projects.push(newProject);
  } else {
  }
};

createDefaultProject();
createProject("Test");


// const projectData = localStorage.getItem("projects");

// if (projectData !== null) {
//   projects = JSON.parse(projectData);
// } else {
// }

// const testProject = new Project("John");
// projects.push(testProject);

// localStorage.setItem("projects", JSON.stringify(projects));

console.table(projects);

const test = displayController();
test.populateProjects(projects);
test.populateProjectDropDown(projects);