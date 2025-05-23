import { getProjects, getToDos } from "./storage";

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

const getMatchingProjectsToDos = function (id) {
  const todos = getToDos();

  const matchingToDos = todos.filter(function (todo) {
    return todo["projectID"] === id;
  });
  return matchingToDos;
};

const getMatchingProjectToDosAmount = function (id) {
  return getMatchingProjectsToDos(id).length;
};

const getMatchingProjectToDosAmountIncomplete = function (id) {
  const incompleteToDos = getMatchingProjectsToDos(id).filter(function (todo) {
    return todo["completed"] === false;
  });

  return incompleteToDos.length;
};

export {
  getProjectByID,
  getToDoByID,
  getMatchingProjectsToDos,
  getMatchingProjectToDosAmount,
  getMatchingProjectToDosAmountIncomplete,
};
