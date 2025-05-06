import {
  getMatchingProjectsToDos,
  getProjectByID,
  getToDoByID,
} from "./filters.js";

import { getProjects } from "./storage.js";

const mainNavProjectsContainer = document.querySelector(
  "#main-nav-projects-container"
);
const toDoListContainer = document.querySelector("#todo-list-container");
const toDoItemDetailsContainer = document.querySelector(
  "#todo-item-details-container"
);

const activeProjectID = "";

const populateProjects = function (projectsArray) {
  mainNavProjectsContainer.textContent = "";

  for (const project of projectsArray) {
    const projectElement = document.createElement("button");
    projectElement.textContent = project["name"];
    projectElement.setAttribute("data-project-id", project["id"]);
    projectElement.setAttribute("class", "project-button");
    mainNavProjectsContainer.appendChild(projectElement);
  }
};

const populateProjectDropDown = function (projectsArray) {
  const projectDropDown = document.querySelector("#new-todo-project-dropdown");
  projectDropDown.textContent = "";

  for (const project of projectsArray) {
    const dropDownOption = document.createElement("option");
    dropDownOption.setAttribute("value", project["id"]);
    dropDownOption.textContent = project["name"];
    projectDropDown.appendChild(dropDownOption);
  }
};

const populateToDoListContainerHeader = function (id) {
  const toDoListContainerHeader = document.querySelector(
    "#todo-list-container-header"
  );

  toDoListContainerHeader.textContent = "";

  const toDoListContainerProjectTitle = document.createElement("div");
  toDoListContainerProjectTitle.setAttribute(
    "id",
    "todo-list-container-project-title"
  );
  const projectTitle = getProjectByID(id)["name"];
  toDoListContainerProjectTitle.textContent = `${projectTitle}`;
  toDoListContainerHeader.appendChild(toDoListContainerProjectTitle);

  const deleteProjectButton = document.createElement("button");
  deleteProjectButton.setAttribute("data-project-id", id);
  deleteProjectButton.setAttribute("class", "delete-project-button");
  deleteProjectButton.setAttribute("type", "button");
  deleteProjectButton.textContent = "Delete This Project";
  toDoListContainerHeader.appendChild(deleteProjectButton);
};

const populateToDoListContainer = function (id) {
  toDoListContainer.textContent = "";

  let toDoList = getMatchingProjectsToDos(id);

  for (const toDo of toDoList) {
    const toDoListItem = document.createElement("button");
    toDoListItem.setAttribute("data-todo-id", toDo["id"]);
    toDoListItem.setAttribute("class", "todo-button");

    const toDoListItemTitle = document.createElement("div");
    toDoListItemTitle.textContent = `Title: ${toDo["title"]}`;
    toDoListItem.appendChild(toDoListItemTitle);

    const toDoListItemDueDate = document.createElement("div");
    toDoListItemDueDate.textContent = `Due Date: ${toDo["dueDate"]}`;
    toDoListItem.appendChild(toDoListItemDueDate);

    const toDoListPriority = document.createElement("div");
    toDoListPriority.textContent = `Priority: ${toDo["priority"]}`;
    toDoListItem.appendChild(toDoListPriority);

    toDoListContainer.appendChild(toDoListItem);
  }
};

const populateToDoItemDetailsContainer = function (id) {
  toDoItemDetailsContainer.textContent = "";

  let toDo = getToDoByID(id);
  console.log(toDo);

  const toDoDetailsItem = document.createElement("div");
  toDoDetailsItem.setAttribute("data-todo-id", toDo["id"]);

  const toDoDetailsItemID = document.createElement("div");
  toDoDetailsItemID.textContent = `ID: ${toDo["id"]}`;
  toDoDetailsItem.appendChild(toDoDetailsItemID);

  const toDoDetailsItemTitle = document.createElement("div");
  toDoDetailsItemTitle.textContent = `Title: ${toDo["title"]}`;
  toDoDetailsItem.appendChild(toDoDetailsItemTitle);

  const toDoDetailsItemDescription = document.createElement("div");
  toDoDetailsItemDescription.textContent = `Description: ${toDo["description"]}`;
  toDoDetailsItem.appendChild(toDoDetailsItemDescription);

  const toDoDetailsItemDueDate = document.createElement("div");
  toDoDetailsItemDueDate.textContent = `Due Date: ${toDo["dueDate"]}`;
  toDoDetailsItem.appendChild(toDoDetailsItemDueDate);

  const toDoDetailsPriority = document.createElement("div");
  toDoDetailsPriority.textContent = `Priority: ${toDo["priority"]}`;
  toDoDetailsItem.appendChild(toDoDetailsPriority);

  const toDoDetailsNotes = document.createElement("div");
  toDoDetailsNotes.textContent = `Notes: ${toDo["notes"]}`;
  toDoDetailsItem.appendChild(toDoDetailsNotes);

  const toDoDetailsCheckList = document.createElement("div");
  toDoDetailsCheckList.textContent = `Checklist: ${toDo["checklist"]}`;
  toDoDetailsItem.appendChild(toDoDetailsCheckList);

  const toDoDetailsProjectID = document.createElement("div");
  toDoDetailsProjectID.textContent = `Project ID: ${toDo["projectID"]}`;
  toDoDetailsItem.appendChild(toDoDetailsProjectID);

  const deleteToDoButton = document.createElement("button");
  deleteToDoButton.setAttribute("class", "delete-todo-button");
  deleteToDoButton.setAttribute("data-todo-id", id);
  deleteToDoButton.setAttribute("type", "button");
  deleteToDoButton.textContent = "Delete This To Do";
  toDoDetailsItem.appendChild(deleteToDoButton);

  toDoItemDetailsContainer.appendChild(toDoDetailsItem);
};

const defaultView = function () {
  const defaultProjectID = getProjects()[0]["id"];
  console.log(defaultProjectID);
  populateToDoListContainerHeader(defaultProjectID);
  populateToDoListContainer(defaultProjectID);
};

export {
  populateProjects,
  populateProjectDropDown,
  populateToDoListContainerHeader,
  populateToDoListContainer,
  populateToDoItemDetailsContainer,
  defaultView,
};
