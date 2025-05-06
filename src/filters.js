import {
  getProjects,
  getToDos,
  createProject,
  createDefaultProject,
  createToDo,
} from "./storage";

const getMatchingProjectsToDosDefault = function () {
  const todos = getToDos();
  const projects = getProjects();

  const matchingToDos = todos.filter(function (todo) {
    return (todo["projectID"] = projects[0]["id"]);
  });

  return matchingToDos;
};

const getMatchingProjectsToDos = function (id) {
  const todos = getToDos();

  const matchingToDos = todos.filter(function (todo) {
    return todo["projectID"] === id;
  });
  return matchingToDos;
};

const getProjectByID = function (id) {
  const projects = getProjects();

  const matchingProject = projects.find(function (project) {
    return project["id"] === id;
  });
  return matchingProject;
};

const getToDoByID = function (id) {
  const todos = getToDos();

  const matchingToDo = todos.find(function (todo) {
    return todo["id"] === id;
  });
  return matchingToDo;
};

export {
  getMatchingProjectsToDosDefault,
  getMatchingProjectsToDos,
  getProjectByID,
  getToDoByID,
};
