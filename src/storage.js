import { Project } from "./project.js";
import { ToDo } from "./todo.js";

const projects = [];
const toDos = [];

const getProjects = function () {
  return projects;
};

const getToDos = function () {
  return toDos;
};

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

const createToDo = function (
  title,
  description = "",
  dueDate = "",
  priority,
  notes = "",
  checklist = "",
  projectID
) {
  const newToDo = new ToDo(
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    projectID
  );

  toDos.push(newToDo);
};

const deleteToDo = function (id) {
  const indexToDelete = toDos.findIndex(function (element) {
    return element["id"] === id;
  });

  toDos.splice(indexToDelete, 1);

  console.log(indexToDelete);
  console.log(toDos);
};

export {
  getProjects,
  getToDos,
  createProject,
  createDefaultProject,
  createToDo,
  deleteToDo,
};
