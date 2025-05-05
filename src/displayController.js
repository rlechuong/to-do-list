import {
  getMatchingProjectsToDosDefault,
  getMatchingProjectsToDos,
  getToDoByID,
} from "./filters.js";

const mainNavProjectsContainer = document.querySelector(
  "#main-nav-projects-container"
);
const toDoListContainer = document.querySelector("#todo-list-container");
const toDoItemDetailsContainer = document.querySelector(
  "#todo-item-details-container"
);

const populateProjects = function (projectsArray) {
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
  for (const project of projectsArray) {
    const dropDownOption = document.createElement("option");
    dropDownOption.setAttribute("value", project["id"]);
    dropDownOption.textContent = project["name"];
    projectDropDown.appendChild(dropDownOption);
  }
};

const populateToDoListContainerDefault = function (id) {
  toDoListContainer.textContent = "";

  let toDoList = getMatchingProjectsToDos(id);

  for (const toDo of toDoList) {
    const toDoListItem = document.createElement("button");
    toDoListItem.setAttribute("data-todo-id", toDo["id"]);
    toDoListItem.setAttribute("class", "todo-button");

    const toDoListItemTitle = document.createElement("div");
    toDoListItemTitle.textContent = `Name: ${toDo["title"]}`;
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
  toDoDetailsItemTitle.textContent = `Name: ${toDo["title"]}`;
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

  toDoItemDetailsContainer.appendChild(toDoDetailsItem);
};

export {
  populateProjects,
  populateProjectDropDown,
  populateToDoListContainerDefault,
  populateToDoItemDetailsContainer,
};
