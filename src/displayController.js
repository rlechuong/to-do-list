import { el } from "date-fns/locale";
import {
  getMatchingProjectsToDos,
  getProjectByID,
  getToDoByID,
  getMatchingProjectToDosAmount,
  getMatchingProjectToDosAmountIncomplete,
} from "./filters.js";
import { getProjects } from "./storage.js";
import { differenceInDays } from "date-fns";
import { colorActiveProject } from "./eventHandler.js";

const mainNavProjectsContainer = document.querySelector(
  "#main-nav-projects-container"
);
const toDoListContainer = document.querySelector("#todo-list-container");
const toDoDetailsContainer = document.querySelector("#todo-details-container");

const populateProjects = function (projectsArray) {
  mainNavProjectsContainer.textContent = "";

  for (const project of projectsArray) {
    const projectContainer = document.createElement("div");
    projectContainer.setAttribute("class", "project-container");
    projectContainer.setAttribute("data-project-id", project["id"]);
    const projectTitle = document.createElement("div");
    projectTitle.textContent = `${project["name"]}`;
    projectTitle.setAttribute("data-project-id", project["id"]);
    projectTitle.setAttribute("class", "project-container-title");
    projectContainer.appendChild(projectTitle);
    const projectToDos = document.createElement("div");
    projectToDos.textContent = `${getMatchingProjectToDosAmountIncomplete(
      project["id"]
    )} / ${getMatchingProjectToDosAmount(project["id"])}`;
    projectToDos.setAttribute("data-project-id", project["id"]);
    projectToDos.setAttribute("class", "project-container-todos");
    projectContainer.appendChild(projectToDos);

    mainNavProjectsContainer.appendChild(projectContainer);
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

const populateProjectDropDownEdit = function (projectsArray) {
  const projectDropDown = document.querySelector("#edit-todo-project-dropdown");
  projectDropDown.textContent = "";

  for (const project of projectsArray) {
    const dropDownOption = document.createElement("option");
    dropDownOption.setAttribute("value", project["id"]);
    dropDownOption.textContent = project["name"];
    projectDropDown.appendChild(dropDownOption);
  }
};

const populateToDoListContainerHeader = function (id) {
  const activeProjectReference = document.querySelector(
    "#active-project-reference"
  );
  activeProjectReference.setAttribute("data-project-id", id);

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
  toDoListContainerProjectTitle.textContent = `${projectTitle} To Dos`;
  toDoListContainerHeader.appendChild(toDoListContainerProjectTitle);

  const toDoListContainerHeaderButtons = document.createElement("div");
  toDoListContainerHeaderButtons.setAttribute(
    "id",
    "todo-list-container-header-buttons"
  );

  const editProjectTitleButton = document.createElement("button");
  editProjectTitleButton.setAttribute("data-project-id", id);
  editProjectTitleButton.setAttribute("class", "edit-project-title-button");
  editProjectTitleButton.setAttribute("type", "button");
  editProjectTitleButton.textContent = "Edit Project Name";
  toDoListContainerHeaderButtons.appendChild(editProjectTitleButton);

  const deleteProjectButton = document.createElement("button");
  deleteProjectButton.setAttribute("data-project-id", id);
  deleteProjectButton.setAttribute("class", "delete-project-button");
  deleteProjectButton.setAttribute("type", "button");
  deleteProjectButton.textContent = "Delete This Project";
  toDoListContainerHeaderButtons.appendChild(deleteProjectButton);

  toDoListContainerHeader.appendChild(toDoListContainerHeaderButtons);
};

const populateToDoListContainer = function (id) {
  toDoListContainer.textContent = "";

  let toDoList = getMatchingProjectsToDos(id);

  for (const toDo of toDoList) {
    const toDoListItem = document.createElement("div");
    toDoListItem.setAttribute("data-todo-id", toDo["id"]);
    toDoListItem.setAttribute("class", "todo-button");

    let opacity = "";

    const toDoListItemCheckBoxContainer = document.createElement("div");
    toDoListItemCheckBoxContainer.setAttribute(
      "class",
      "todo-list-item-checkbox-container"
    );
    const toDoListItemCheckBox = document.createElement("input");
    toDoListItemCheckBox.setAttribute("type", "checkbox");
    toDoListItemCheckBox.setAttribute("class", "completion-status");
    toDoListItemCheckBox.setAttribute("name", "completion-status");
    toDoListItemCheckBox.setAttribute("data-todo-id", toDo["id"]);
    toDoListItemCheckBoxContainer.appendChild(toDoListItemCheckBox);
    toDoListItem.appendChild(toDoListItemCheckBoxContainer);

    if (toDo["completed"] === true) {
      opacity = "0.5";
      toDoListItemCheckBox.checked = true;
    } else {
      opacity = "1";
      toDoListItemCheckBox.checked = false;
    }

    const toDoListItemTitle = document.createElement("div");
    toDoListItemTitle.setAttribute("class", "todo-list-item-title");
    toDoListItemTitle.setAttribute("data-todo-id", toDo["id"]);
    toDoListItemTitle.textContent = `${toDo["title"]}`;
    toDoListItem.appendChild(toDoListItemTitle);

    const currentDate = new Date().toISOString().slice(0, 10);
    const daysDue = differenceInDays(toDo["dueDate"], currentDate);

    if (toDo["dueDate"]) {
      const toDoListItemDueDate = document.createElement("div");
      toDoListItemDueDate.setAttribute("class", "todo-list-item-due-date");
      toDoListItemDueDate.textContent = `Due: ${toDo["dueDate"]}`;
      toDoListItem.appendChild(toDoListItemDueDate);

      const toDoListDaysDue = document.createElement("div");
      toDoListDaysDue.setAttribute("class", "todo-list-item-days-due");
      if (daysDue > 0) {
        toDoListDaysDue.textContent = `In ${daysDue} Days`;
      } else if (daysDue < 0) {
        toDoListDaysDue.textContent = `${daysDue * -1} Days Ago`;
      } else if (daysDue === 0) {
        toDoListDaysDue.textContent = `Today`;
      }
      toDoListItem.appendChild(toDoListDaysDue);
    }

    // const toDoListPriority = document.createElement("div");
    // toDoListPriority.textContent = `Priority: ${toDo["priority"]}`;
    // toDoListItem.appendChild(toDoListPriority);

    const priorityToColor = toDo["priority"];

    let priorityColor;

    if (priorityToColor === "Very High") {
      priorityColor = "rgba(255, 0, 0, 1)";
    } else if (priorityToColor === "High") {
      priorityColor = "rgba(255, 165, 0, 1)";
    } else if (priorityToColor === "Medium") {
      priorityColor = "rgba(255, 255, 0, 0.75)";
    } else if (priorityToColor === "Low") {
      priorityColor = "rgba(0, 255, 0, 0.75)";
    } else if (priorityToColor === "Very Low") {
      priorityColor = "rgba(0, 165, 255, 1)";
    }

    // const priorityColorBar = document.createElement("div");
    // priorityColorBar.textContent = "test";
    toDoListItem.setAttribute(
      "style",
      `background-image: linear-gradient(to right, ${priorityColor}, rgb(30,30,30) 4rem); opacity: ${opacity}`
    );
    // toDoListItem.appendChild(priorityColorBar);

    toDoListContainer.appendChild(toDoListItem);
  }
};

const populateToDoItemDetails = function (id) {
  toDoDetailsContainer.textContent = "";

  let toDo = getToDoByID(id);

  // const toDoIDContainer = document.createElement("div");
  // toDoIDContainer.setAttribute("id", "todo-id-container");
  // toDoIDContainer.setAttribute("data-todo-id", toDo["id"]);
  // const toDoIDHeader = document.createElement("div");
  // toDoIDHeader.setAttribute("id", "todo-id-header");
  // toDoIDHeader.setAttribute("data-todo-id", toDo["id"]);
  // toDoIDHeader.textContent = "ID";
  // toDoIDContainer.appendChild(toDoIDHeader);
  // const toDoIDContent = document.createElement("div");
  // toDoIDContent.setAttribute("id", "todo-id-content");
  // toDoIDContent.setAttribute("data-todo-id", toDo["id"]);
  // toDoIDContent.textContent = `${toDo["id"]}`;
  // toDoIDContainer.appendChild(toDoIDContent);

  // toDoDetailsContainer.appendChild(toDoIDContainer);

  const ToDoTitleHeaderContainer = document.createElement("div");
  ToDoTitleHeaderContainer.setAttribute("id", "todo-title-header-container");

  const hrTitle = document.createElement("hr");
  hrTitle.setAttribute("class", "main-details-hr");

  const toDoTitleContainer = document.createElement("div");
  toDoTitleContainer.setAttribute("id", "todo-title-container");
  toDoTitleContainer.setAttribute("data-todo-id", toDo["id"]);
  const toDoTitleHeader = document.createElement("div");
  toDoTitleHeader.setAttribute("id", "todo-title-header");
  toDoTitleHeader.setAttribute("data-todo-id", toDo["id"]);
  toDoTitleHeader.textContent = "Title";
  ToDoTitleHeaderContainer.appendChild(toDoTitleHeader);
  const editToDoTitleButton = document.createElement("div");
  editToDoTitleButton.setAttribute("id", "edit-todo-title-button");
  editToDoTitleButton.setAttribute("data-todo-id", toDo["id"]);
  editToDoTitleButton.textContent = ">";
  ToDoTitleHeaderContainer.appendChild(editToDoTitleButton);
  toDoTitleContainer.appendChild(ToDoTitleHeaderContainer);
  const toDoTitleContent = document.createElement("div");
  toDoTitleContent.setAttribute("id", "todo-title-content");
  toDoTitleContent.setAttribute("data-todo-id", toDo["id"]);
  toDoTitleContent.textContent = `${toDo["title"]}`;
  toDoTitleContainer.appendChild(toDoTitleContent);
  toDoTitleContainer.appendChild(hrTitle);

  toDoDetailsContainer.appendChild(toDoTitleContainer);

  const ToDoDescriptionHeaderContainer = document.createElement("div");
  ToDoDescriptionHeaderContainer.setAttribute(
    "id",
    "todo-description-header-container"
  );

  const hrDescription = document.createElement("hr");
  hrDescription.setAttribute("class", "main-details-hr");

  const toDoDescriptionContainer = document.createElement("div");
  toDoDescriptionContainer.setAttribute("id", "todo-description-container");
  toDoDescriptionContainer.setAttribute("data-todo-id", toDo["id"]);
  const toDoDescriptionHeader = document.createElement("div");
  toDoDescriptionHeader.setAttribute("id", "todo-description-header");
  toDoDescriptionHeader.setAttribute("data-todo-id", toDo["id"]);
  toDoDescriptionHeader.textContent = "Description";
  ToDoDescriptionHeaderContainer.appendChild(toDoDescriptionHeader);
  const editToDoDescriptionButton = document.createElement("div");
  editToDoDescriptionButton.setAttribute("id", "edit-todo-description-button");
  editToDoDescriptionButton.setAttribute("data-todo-id", toDo["id"]);
  editToDoDescriptionButton.textContent = ">";
  ToDoDescriptionHeaderContainer.appendChild(editToDoDescriptionButton);
  toDoDescriptionContainer.appendChild(ToDoDescriptionHeaderContainer);
  const toDoDescriptionContent = document.createElement("div");
  toDoDescriptionContent.setAttribute("id", "todo-description-content");
  toDoDescriptionContent.setAttribute("data-todo-id", toDo["id"]);
  toDoDescriptionContent.textContent = `${toDo["description"]}`;
  toDoDescriptionContainer.appendChild(toDoDescriptionContent);
  toDoDescriptionContainer.appendChild(hrDescription);

  toDoDetailsContainer.appendChild(toDoDescriptionContainer);

  const ToDoDueDateHeaderContainer = document.createElement("div");
  ToDoDueDateHeaderContainer.setAttribute(
    "id",
    "todo-due-date-header-container"
  );

  const hrDueDate = document.createElement("hr");
  hrDueDate.setAttribute("class", "main-details-hr");

  const toDoDueDateContainer = document.createElement("div");
  toDoDueDateContainer.setAttribute("id", "todo-due-date-container");
  toDoDueDateContainer.setAttribute("data-todo-id", toDo["id"]);
  const toDoDueDateHeader = document.createElement("div");
  toDoDueDateHeader.setAttribute("id", "todo-due-date-header");
  toDoDueDateHeader.setAttribute("data-todo-id", toDo["id"]);
  toDoDueDateHeader.textContent = "Due Date";
  ToDoDueDateHeaderContainer.appendChild(toDoDueDateHeader);
  const editToDoDueDateButton = document.createElement("div");
  editToDoDueDateButton.setAttribute("id", "edit-todo-due-date-button");
  editToDoDueDateButton.setAttribute("data-todo-id", toDo["id"]);
  editToDoDueDateButton.textContent = ">";
  ToDoDueDateHeaderContainer.appendChild(editToDoDueDateButton);
  toDoDueDateContainer.appendChild(ToDoDueDateHeaderContainer);
  const toDoDueDateContent = document.createElement("div");
  toDoDueDateContent.setAttribute("id", "todo-due-date-content");
  toDoDueDateContent.setAttribute("data-todo-id", toDo["id"]);
  toDoDueDateContent.textContent = `${toDo["dueDate"]}`;
  toDoDueDateContainer.appendChild(toDoDueDateContent);
  toDoDueDateContainer.appendChild(hrDueDate);

  toDoDetailsContainer.appendChild(toDoDueDateContainer);

  const ToDoPriorityHeaderContainer = document.createElement("div");
  ToDoPriorityHeaderContainer.setAttribute(
    "id",
    "todo-priority-header-container"
  );

  const hrPriority = document.createElement("hr");
  hrPriority.setAttribute("class", "main-details-hr");

  const toDoPriorityContainer = document.createElement("div");
  toDoPriorityContainer.setAttribute("id", "todo-priority-container");
  toDoPriorityContainer.setAttribute("data-todo-id", toDo["id"]);
  const toDoPriorityHeader = document.createElement("div");
  toDoPriorityHeader.setAttribute("id", "todo-priority-header");
  toDoPriorityHeader.setAttribute("data-todo-id", toDo["id"]);
  toDoPriorityHeader.textContent = "Priority";
  ToDoPriorityHeaderContainer.appendChild(toDoPriorityHeader);
  const editToDoPriorityButton = document.createElement("div");
  editToDoPriorityButton.setAttribute("id", "edit-todo-priority-button");
  editToDoPriorityButton.setAttribute("data-todo-id", toDo["id"]);
  editToDoPriorityButton.textContent = ">";
  ToDoPriorityHeaderContainer.appendChild(editToDoPriorityButton);
  toDoPriorityContainer.appendChild(ToDoPriorityHeaderContainer);
  const toDoPriorityContent = document.createElement("div");
  toDoPriorityContent.setAttribute("id", "todo-priority-content");
  toDoPriorityContent.setAttribute("data-todo-id", toDo["id"]);
  toDoPriorityContent.textContent = `${toDo["priority"]}`;
  toDoPriorityContainer.appendChild(toDoPriorityContent);
  toDoPriorityContainer.appendChild(hrPriority);

  toDoDetailsContainer.appendChild(toDoPriorityContainer);

  const ToDoNotesHeaderContainer = document.createElement("div");
  ToDoNotesHeaderContainer.setAttribute("id", "todo-notes-header-container");

  const hrNotes = document.createElement("hr");
  hrNotes.setAttribute("class", "main-details-hr");

  const toDoNotesContainer = document.createElement("div");
  toDoNotesContainer.setAttribute("id", "todo-notes-container");
  toDoNotesContainer.setAttribute("data-todo-id", toDo["id"]);
  const toDoNotesHeader = document.createElement("div");
  toDoNotesHeader.setAttribute("id", "todo-notes-header");
  toDoNotesHeader.setAttribute("data-todo-id", toDo["id"]);
  toDoNotesHeader.textContent = "Notes";
  ToDoNotesHeaderContainer.appendChild(toDoNotesHeader);
  const editToDoNotesButton = document.createElement("div");
  editToDoNotesButton.setAttribute("id", "edit-todo-notes-button");
  editToDoNotesButton.setAttribute("data-todo-id", toDo["id"]);
  editToDoNotesButton.textContent = ">";
  ToDoNotesHeaderContainer.appendChild(editToDoNotesButton);
  toDoNotesContainer.appendChild(ToDoNotesHeaderContainer);
  const toDoNotesContent = document.createElement("div");
  toDoNotesContent.setAttribute("id", "todo-notes-content");
  toDoNotesContent.setAttribute("data-todo-id", toDo["id"]);
  toDoNotesContent.textContent = `${toDo["notes"]}`;
  toDoNotesContainer.appendChild(toDoNotesContent);
  toDoNotesContainer.appendChild(hrNotes);

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

  const ToDoProjectIDsHeaderContainer = document.createElement("div");
  ToDoProjectIDsHeaderContainer.setAttribute(
    "id",
    "todo-projectID-header-container"
  );

  const hrProjectID = document.createElement("hr");
  hrProjectID.setAttribute("class", "main-details-hr");

  const toDoProjectIDContainer = document.createElement("div");
  toDoProjectIDContainer.setAttribute("id", "todo-projectID-container");
  toDoProjectIDContainer.setAttribute("data-todo-id", toDo["id"]);
  const toDoProjectIDHeader = document.createElement("div");
  toDoProjectIDHeader.setAttribute("id", "todo-projectID-header");
  toDoProjectIDHeader.setAttribute("data-todo-id", toDo["id"]);
  toDoProjectIDHeader.textContent = "Project Name";
  ToDoProjectIDsHeaderContainer.appendChild(toDoProjectIDHeader);
  const editToDoProjectButton = document.createElement("div");
  editToDoProjectButton.setAttribute("id", "edit-todo-projectID-button");
  editToDoProjectButton.setAttribute("data-todo-id", toDo["id"]);
  editToDoProjectButton.textContent = ">";
  ToDoProjectIDsHeaderContainer.appendChild(editToDoProjectButton);
  toDoProjectIDContainer.appendChild(ToDoProjectIDsHeaderContainer);
  const toDoProjectIDContent = document.createElement("div");
  toDoProjectIDContent.setAttribute("id", "todo-projectID-content");
  toDoProjectIDContent.setAttribute("data-todo-id", toDo["id"]);
  toDoProjectIDContent.textContent = `${
    getProjectByID(toDo["projectID"])["name"]
  }`;
  toDoProjectIDContainer.appendChild(toDoProjectIDContent);
  toDoProjectIDContainer.appendChild(hrProjectID);

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
  populateToDoListContainerHeader(defaultProjectID);
  populateToDoListContainer(defaultProjectID);
  colorActiveProject(defaultProjectID);
};

export {
  populateProjects,
  populateProjectDropDown,
  populateProjectDropDownEdit,
  populateToDoListContainerHeader,
  populateToDoListContainer,
  populateToDoItemDetails,
  defaultView,
};
