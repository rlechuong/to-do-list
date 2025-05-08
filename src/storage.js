import { Project } from "./project.js";
import { ToDo } from "./todo.js";
import { getMatchingProjectsToDos } from "./filters.js";

let projects = [];
let toDos = [];

const saveProjectsToStorage = function (array) {
  localStorage.setItem("projects", JSON.stringify(array));
};

const saveToDosToStorage = function (array) {
  localStorage.setItem("toDos", JSON.stringify(array));
};

const getProjects = function () {
  if (localStorage.getItem("projects")) {
    projects = JSON.parse(localStorage.getItem("projects"));
    return projects;
  } else {
    createDefaultProject();
  }
};

const createProject = function (name) {
  const newProject = new Project(name);
  projects.push(newProject);
  saveProjectsToStorage(projects);
};

const createDefaultProject = function () {
  if (projects.length === 0) {
    const newProject = new Project("Default");
    projects.push(newProject);
    saveProjectsToStorage(projects);
  } else {
  }
};

const getToDos = function () {
  if (localStorage.getItem("toDos")) {
    toDos = JSON.parse(localStorage.getItem("toDos"));
    return toDos;
  } else {
    return toDos;
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
  saveToDosToStorage(toDos);
};

const deleteProject = function (id) {
  const indexToDelete = projects.findIndex(function (element) {
    return element["id"] === id;
  });

  if (indexToDelete === 0) {
    alert("Cannot Delete First Project.");
  } else {
    const toDosToDelete = getMatchingProjectsToDos(id);

    for (const todo of toDosToDelete) {
      deleteToDo(todo["id"]);
    }

    projects.splice(indexToDelete, 1);
    saveProjectsToStorage(projects);
  }
};

const deleteToDo = function (id) {
  const indexToDelete = toDos.findIndex(function (element) {
    return element["id"] === id;
  });

  toDos.splice(indexToDelete, 1);
  saveToDosToStorage(toDos);
};

export {
  saveProjectsToStorage,
  saveToDosToStorage,
  getProjects,
  getToDos,
  createProject,
  createDefaultProject,
  createToDo,
  deleteProject,
  deleteToDo,
};
