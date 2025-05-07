import {
  getMatchingProjectsToDos,
  getProjectByID,
  getToDoByID,
} from "./filters.js";
import { getProjects } from "./storage.js";
import { differenceInDays } from "date-fns";

const mainNavProjectsContainer = document.querySelector(
  "#main-nav-projects-container"
);
const toDoListContainer = document.querySelector("#todo-list-container");
const toDoDetailsContainer = document.querySelector("#todo-details-container");

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
    const currentDate = new Date().toISOString().slice(0, 10);
    const daysDue = differenceInDays(toDo["dueDate"], currentDate);

    const toDoListItem = document.createElement("button");
    toDoListItem.setAttribute("data-todo-id", toDo["id"]);
    toDoListItem.setAttribute("class", "todo-button");

    const toDoListItemTitle = document.createElement("div");
    toDoListItemTitle.textContent = `Title: ${toDo["title"]}`;
    toDoListItem.appendChild(toDoListItemTitle);

    const toDoListItemDueDate = document.createElement("div");
    toDoListItemDueDate.textContent = `Due Date: ${toDo["dueDate"]}`;
    toDoListItem.appendChild(toDoListItemDueDate);

    const toDoListDaysDue = document.createElement("div");
    toDoListDaysDue.textContent = `Due In ${daysDue} days.`;
    toDoListItem.appendChild(toDoListDaysDue);

    const toDoListPriority = document.createElement("div");
    toDoListPriority.textContent = `Priority: ${toDo["priority"]}`;
    toDoListItem.appendChild(toDoListPriority);

    toDoListContainer.appendChild(toDoListItem);
  }
};

const populateToDoItemDetails = function (id) {
  toDoDetailsContainer.textContent = "";

  let toDo = getToDoByID(id);

  const toDoIDContainer = document.createElement("div");
  toDoIDContainer.setAttribute("id", "todo-id-container");
  toDoIDContainer.setAttribute("data-todo-id", toDo["id"]);
  const toDoIDHeader = document.createElement("div");
  toDoIDHeader.setAttribute("id", "todo-id-header");
  toDoIDHeader.setAttribute("data-todo-id", toDo["id"]);
  toDoIDHeader.textContent = "ID";
  toDoIDContainer.appendChild(toDoIDHeader);
  const toDoIDContent = document.createElement("div");
  toDoIDContent.setAttribute("id", "todo-id-content");
  toDoIDContent.setAttribute("data-todo-id", toDo["id"]);
  toDoIDContent.textContent = `${toDo["id"]}`;
  toDoIDContainer.appendChild(toDoIDContent);

  toDoDetailsContainer.appendChild(toDoIDContainer);

  const toDoTitleContainer = document.createElement("div");
  toDoTitleContainer.setAttribute("id", "todo-title-container");
  toDoTitleContainer.setAttribute("data-todo-id", toDo["id"]);
  const toDoTitleHeader = document.createElement("div");
  toDoTitleHeader.setAttribute("id", "todo-title-header");
  toDoTitleHeader.setAttribute("data-todo-id", toDo["id"]);
  toDoTitleHeader.textContent = "Title";
  toDoTitleContainer.appendChild(toDoTitleHeader);
  const editToDoTitleButton = document.createElement("button");
  editToDoTitleButton.setAttribute("id", "edit-todo-title-button");
  editToDoTitleButton.setAttribute("data-todo-id", toDo["id"]);
  editToDoTitleButton.setAttribute("type", "button");
  editToDoTitleButton.textContent = "Edit";
  toDoTitleContainer.appendChild(editToDoTitleButton);
  const toDoTitleContent = document.createElement("div");
  toDoTitleContent.setAttribute("id", "todo-title-content");
  toDoTitleContent.setAttribute("data-todo-id", toDo["id"]);
  toDoTitleContent.textContent = `${toDo["title"]}`;
  toDoTitleContainer.appendChild(toDoTitleContent);

  toDoDetailsContainer.appendChild(toDoTitleContainer);

  const toDoDescriptionContainer = document.createElement("div");
  toDoDescriptionContainer.setAttribute("id", "todo-description-container");
  toDoDescriptionContainer.setAttribute("data-todo-id", toDo["id"]);
  const toDoDescriptionHeader = document.createElement("div");
  toDoDescriptionHeader.setAttribute("id", "todo-description-header");
  toDoDescriptionHeader.setAttribute("data-todo-id", toDo["id"]);
  toDoDescriptionHeader.textContent = "Description";
  toDoDescriptionContainer.appendChild(toDoDescriptionHeader);
  const editToDoDescriptionButton = document.createElement("button");
  editToDoDescriptionButton.setAttribute("id", "edit-todo-description-button");
  editToDoDescriptionButton.setAttribute("data-todo-id", toDo["id"]);
  editToDoDescriptionButton.setAttribute("type", "button");
  editToDoDescriptionButton.textContent = "Edit";
  toDoDescriptionContainer.appendChild(editToDoDescriptionButton);
  const toDoDescriptionContent = document.createElement("div");
  toDoDescriptionContent.setAttribute("id", "todo-description-content");
  toDoDescriptionContent.setAttribute("data-todo-id", toDo["id"]);
  toDoDescriptionContent.textContent = `${toDo["description"]}`;
  toDoDescriptionContainer.appendChild(toDoDescriptionContent);

  toDoDetailsContainer.appendChild(toDoDescriptionContainer);

  const toDoDueDateContainer = document.createElement("div");
  toDoDueDateContainer.setAttribute("id", "todo-due-date-container");
  toDoDueDateContainer.setAttribute("data-todo-id", toDo["id"]);
  const toDoDueDateHeader = document.createElement("div");
  toDoDueDateHeader.setAttribute("id", "todo-due-date-header");
  toDoDueDateHeader.setAttribute("data-todo-id", toDo["id"]);
  toDoDueDateHeader.textContent = "Due Date";
  toDoDueDateContainer.appendChild(toDoDueDateHeader);
  const editToDoDueDateButton = document.createElement("button");
  editToDoDueDateButton.setAttribute("id", "edit-todo-due-date-button");
  editToDoDueDateButton.setAttribute("data-todo-id", toDo["id"]);
  editToDoDueDateButton.setAttribute("type", "button");
  editToDoDueDateButton.textContent = "Edit";
  toDoDueDateContainer.appendChild(editToDoDueDateButton);
  const toDoDueDateContent = document.createElement("div");
  toDoDueDateContent.setAttribute("id", "todo-due-date-content");
  toDoDueDateContent.setAttribute("data-todo-id", toDo["id"]);
  toDoDueDateContent.textContent = `${toDo["dueDate"]}`;
  toDoDueDateContainer.appendChild(toDoDueDateContent);

  toDoDetailsContainer.appendChild(toDoDueDateContainer);

  const toDoPriorityContainer = document.createElement("div");
  toDoPriorityContainer.setAttribute("id", "todo-priority-container");
  toDoPriorityContainer.setAttribute("data-todo-id", toDo["id"]);
  const toDoPriorityHeader = document.createElement("div");
  toDoPriorityHeader.setAttribute("id", "todo-priority-header");
  toDoPriorityHeader.setAttribute("data-todo-id", toDo["id"]);
  toDoPriorityHeader.textContent = "Priority";
  toDoPriorityContainer.appendChild(toDoPriorityHeader);
  const editToDoPriorityButton = document.createElement("button");
  editToDoPriorityButton.setAttribute("id", "edit-todo-priority-button");
  editToDoPriorityButton.setAttribute("data-todo-id", toDo["id"]);
  editToDoPriorityButton.setAttribute("type", "button");
  editToDoPriorityButton.textContent = "Edit";
  toDoPriorityContainer.appendChild(editToDoPriorityButton);
  const toDoPriorityContent = document.createElement("div");
  toDoPriorityContent.setAttribute("id", "todo-priority-content");
  toDoPriorityContent.setAttribute("data-todo-id", toDo["id"]);
  toDoPriorityContent.textContent = `${toDo["priority"]}`;
  toDoPriorityContainer.appendChild(toDoPriorityContent);

  toDoDetailsContainer.appendChild(toDoPriorityContainer);

  const toDoNotesContainer = document.createElement("div");
  toDoNotesContainer.setAttribute("id", "todo-notes-container");
  toDoNotesContainer.setAttribute("data-todo-id", toDo["id"]);
  const toDoNotesHeader = document.createElement("div");
  toDoNotesHeader.setAttribute("id", "todo-notes-header");
  toDoNotesHeader.setAttribute("data-todo-id", toDo["id"]);
  toDoNotesHeader.textContent = "Notes";
  toDoNotesContainer.appendChild(toDoNotesHeader);
  const editToDoNotesButton = document.createElement("button");
  editToDoNotesButton.setAttribute("id", "edit-todo-notes-button");
  editToDoNotesButton.setAttribute("data-todo-id", toDo["id"]);
  editToDoNotesButton.setAttribute("type", "button");
  editToDoNotesButton.textContent = "Edit";
  toDoNotesContainer.appendChild(editToDoNotesButton);
  const toDoNotesContent = document.createElement("div");
  toDoNotesContent.setAttribute("id", "todo-notes-content");
  toDoNotesContent.setAttribute("data-todo-id", toDo["id"]);
  toDoNotesContent.textContent = `${toDo["notes"]}`;
  toDoNotesContainer.appendChild(toDoNotesContent);

  toDoDetailsContainer.appendChild(toDoNotesContainer);

  // const toDoChecklistContainer = document.createElement("div");
  // toDoChecklistContainer.setAttribute("id", "todo-checklist-container");
  // toDoChecklistContainer.setAttribute("data-todo-id", toDo["id"]);
  // const toDoChecklistHeader = document.createElement("div");
  // toDoChecklistHeader.setAttribute("id", "todo-checklist-header");
  // toDoChecklistHeader.setAttribute("data-todo-id", toDo["id"]);
  // toDoChecklistHeader.textContent = "Checklist";
  // toDoChecklistContainer.appendChild(toDoChecklistHeader);
  // const toDoChecklistContent = document.createElement("div");
  // toDoChecklistContent.setAttribute("id", "todo-checklist-content");
  // toDoChecklistContent.setAttribute("data-todo-id", toDo["id"]);
  // toDoChecklistContent.textContent = `${toDo["checklist"]}`;
  // toDoChecklistContainer.appendChild(toDoChecklistContent);

  // toDoDetailsContainer.appendChild(toDoChecklistContainer);

  const toDoProjectIDContainer = document.createElement("div");
  toDoProjectIDContainer.setAttribute("id", "todo-projectID-container");
  toDoProjectIDContainer.setAttribute("data-todo-id", toDo["id"]);
  const toDoProjectIDHeader = document.createElement("div");
  toDoProjectIDHeader.setAttribute("id", "todo-projectID-header");
  toDoProjectIDHeader.setAttribute("data-todo-id", toDo["id"]);
  toDoProjectIDHeader.textContent = "Project ID";
  toDoProjectIDContainer.appendChild(toDoProjectIDHeader);
  const toDoProjectIDContent = document.createElement("div");
  toDoProjectIDContent.setAttribute("id", "todo-projectID-content");
  toDoProjectIDContent.setAttribute("data-todo-id", toDo["id"]);
  toDoProjectIDContent.textContent = `${toDo["projectID"]}`;
  toDoProjectIDContainer.appendChild(toDoProjectIDContent);

  toDoDetailsContainer.appendChild(toDoProjectIDContainer);

  const deleteToDoButton = document.createElement("button");
  deleteToDoButton.setAttribute("class", "delete-todo-button");
  deleteToDoButton.setAttribute("data-todo-id", id);
  deleteToDoButton.setAttribute("type", "button");
  deleteToDoButton.textContent = "Delete This To Do";
  toDoDetailsContainer.appendChild(deleteToDoButton);
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
  populateToDoItemDetails,
  defaultView,
};
