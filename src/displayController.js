import {
  getMatchingProjectsToDosDefault,
  getMatchingProjectsToDos,
} from "./filters.js";

const mainNavProjectsContainer = document.querySelector(
  "#main-nav-projects-container"
);
const toDoListContainer = document.querySelector("#todo-list-container");

const populateProjects = function (projectsArray) {
  for (const project of projectsArray) {
    const projectElement = document.createElement("button");
    projectElement.textContent = project["name"];
    projectElement.setAttribute("data-id", project["id"]);
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

    const toDoListItemID = document.createElement("div");
    toDoListItemID.textContent = `ID: ${toDo["id"]}`;
    toDoListItem.appendChild(toDoListItemID);

    const toDoListItemTitle = document.createElement("div");
    toDoListItemTitle.textContent = `Name: ${toDo["title"]}`;
    toDoListItem.appendChild(toDoListItemTitle);

    const toDoListItemDescription = document.createElement("div");
    toDoListItemDescription.textContent = `Description: ${toDo["description"]}`;
    toDoListItem.appendChild(toDoListItemDescription);

    const toDoListItemDueDate = document.createElement("div");
    toDoListItemDueDate.textContent = `Due Date: ${toDo["dueDate"]}`;
    toDoListItem.appendChild(toDoListItemDueDate);

    const toDoListPriority = document.createElement("div");
    toDoListPriority.textContent = `Priority: ${toDo["priority"]}`;
    toDoListItem.appendChild(toDoListPriority);

    const toDoListNotes = document.createElement("div");
    toDoListNotes.textContent = `Notes: ${toDo["notes"]}`;
    toDoListItem.appendChild(toDoListNotes);

    const toDoListCheckList = document.createElement("div");
    toDoListCheckList.textContent = `Checklist: ${toDo["checklist"]}`;
    toDoListItem.appendChild(toDoListCheckList);

    const toDoListProjectID = document.createElement("div");
    toDoListProjectID.textContent = `Project ID: ${toDo["projectID"]}`;
    toDoListItem.appendChild(toDoListProjectID);

    toDoListContainer.appendChild(toDoListItem);
  }
};

export {
  populateProjects,
  populateProjectDropDown,
  populateToDoListContainerDefault,
};
