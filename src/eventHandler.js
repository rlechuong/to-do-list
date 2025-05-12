import {
  getProjects,
  getToDos,
  saveToDosToStorage,
  createProject,
  createToDo,
  deleteProject,
  deleteToDo,
  saveProjectsToStorage,
  changeToDoCompletion,
} from "./storage.js";
import {
  populateProjects,
  populateProjectDropDown,
  populateProjectDropDownEdit,
  populateToDoListContainerHeader,
  populateToDoListContainer,
  populateToDoItemDetails,
  defaultView,
} from "./displayController.js";
import { getToDoByID, getProjectByID } from "./filters.js";

const newToDoDialog = document.querySelector("#new-todo-dialog");
const newProjectDialog = document.querySelector("#new-project-dialog");
const toDoDetailsContainer = document.querySelector("#todo-details-container");
const mainDisplay = document.querySelector("#main-display");
const mainNav = document.querySelector("#main-nav");

let toDos = getToDos();
let projects = getProjects();

const addAllEvents = function () {
  changeCompletionStatusEvent();
  addNewToDoButtonEvents();
  addNewToDoDialogCloseButtonEvents();
  addNewProjectDialogCloseButtonEvents();
  addNewToDoDialogSubmitButtonEvents();
  addProjectButtonEvents();
  addToDoButtonEvents();
  addNewProjectButtonEvents();
  addNewProjectDialogSubmitButtonEvents();
  addDeleteProjectButtonEvents();
  editProjectTitleButton();
  editProjectTitleDialogSubmitButtonEvents();
};

const getActiveToDo = function () {
  const activeToDoReference = document.querySelector("#active-todo-reference");

  let toDoToEdit;

  toDos.forEach(function (todo) {
    if (todo["id"] === activeToDoReference.getAttribute("data-todo-id")) {
      toDoToEdit = todo;
    }
  });

  return toDoToEdit;
};

const addNewProjectButtonEvents = function () {
  const newProjectButton = document.querySelector("#new-project-button");

  newProjectButton.addEventListener("click", () => {
    newProjectDialog.showModal();
  });
};

const addNewProjectDialogCloseButtonEvents = function () {
  const newProjectDialogCloseButton = document.querySelector(
    "#new-project-dialog-close-button"
  );

  newProjectDialogCloseButton.addEventListener("click", () => {
    newProjectDialog.close();
  });
};

const addNewProjectDialogSubmitButtonEvents = function () {
  const newProjectForm = document.querySelector("#new-project-form");

  const newProjectDialogSubmitButton = document.querySelector(
    "#new-project-dialog-submit-button"
  );

  newProjectDialogSubmitButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (newProjectForm.reportValidity()) {
      const newProjectTitle =
        document.querySelector("#new-project-title").value;

      createProject(newProjectTitle);

      const latestProjectIndex = getProjects().length - 1;

      toDoDetailsContainer.textContent = "";
      populateProjects(getProjects());
      populateProjectDropDown(getProjects());
      populateToDoListContainerHeader(getProjects()[latestProjectIndex]["id"]);
      populateToDoListContainer(getProjects()[latestProjectIndex]["id"]);
      addDeleteProjectButtonEvents();
      addProjectButtonEvents();
      changeCompletionStatusEvent();

      newProjectDialog.close();
    } else {
    }
  });
};

const addNewToDoButtonEvents = function () {
  const newToDoButton = document.querySelector("#new-todo-button");

  newToDoButton.addEventListener("click", () => {
    const projectDropDown = document.querySelector(
      "#new-todo-project-dropdown"
    );

    const activeProjectReference = document.querySelector(
      "#active-project-reference"
    );
    const activeProjectID =
      activeProjectReference.getAttribute("data-project-id");

    for (let i = 0; i < projectDropDown.options.length; i++) {
      if (projectDropDown.options[i].value === activeProjectID) {
        projectDropDown.options[i].selected = true;
        break;
      }
    }
    newToDoDialog.showModal();
  });
};

const addNewToDoDialogCloseButtonEvents = function () {
  const newToDoDialogCloseButton = document.querySelector(
    "#new-todo-dialog-close-button"
  );

  newToDoDialogCloseButton.addEventListener("click", () => {
    newToDoDialog.close();
  });
};

const colorActiveProject = function (id) {
  const projectTitleList = document.querySelectorAll(
    ".project-container-title"
  );

  projectTitleList.forEach(function (projectTitle) {
    if (projectTitle.getAttribute("data-project-id") === id) {
      projectTitle.setAttribute("style", "color: rgba(255, 0, 0, 0.87)");
    } else {
      projectTitle.setAttribute("style", "color: rgba(255, 255, 255, 0.87)");
    }
  });

  const projectContainerList = document.querySelectorAll(".project-container");

  projectContainerList.forEach(function (projectContainer) {
    if (projectContainer.getAttribute("data-project-id") === id) {
      projectContainer.setAttribute(
        "style",
        "border: 1px solid rgba(255, 0, 0, 0.87)"
      );
    } else {
      projectContainer.setAttribute(
        "style",
        "border: 1px solid rgba(255, 255, 255, 0.6)"
      );
    }
  });

  const projectToDosList = document.querySelectorAll(
    ".project-container-todos"
  );

  projectToDosList.forEach(function (projectToDos) {
    if (projectToDos.getAttribute("data-project-id") === id) {
      projectToDos.setAttribute("style", "color: rgba(255, 0, 0, 0.87)");
    } else {
      projectToDos.setAttribute("style", "color: rgba(255, 255, 255, 0.6)");
    }
  });
};

const addProjectButtonEvents = function () {
  const projectButtonList = document.querySelectorAll(".project-container");

  projectButtonList.forEach(function (button) {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-project-id");
      colorActiveProject(id);
      populateToDoListContainer(id);
      populateToDoListContainerHeader(id);
      addDeleteProjectButtonEvents();
      addToDoButtonEvents();
      editProjectTitleButton();
      changeCompletionStatusEvent();
      toDoDetailsContainer.textContent = "";
    });
  });
};

const addToDoButtonEvents = function () {
  const toDoButtonList = document.querySelectorAll(".todo-button");

  toDoButtonList.forEach(function (button) {
    button.addEventListener("click", () => {
      const activeToDoReference = document.querySelector(
        "#active-todo-reference"
      );
      const id = button.getAttribute("data-todo-id");
      activeToDoReference.setAttribute("data-todo-id", id);
      populateToDoItemDetails(id);
      addDeleteToDoButtonEvents(id);
      editFormButtons();
    });
  });
};

const addNewToDoDialogSubmitButtonEvents = function () {
  const newToDoForm = document.querySelector("#new-todo-form");

  const newToDoDialogSubmitButton = document.querySelector(
    "#new-todo-dialog-submit-button"
  );

  newToDoDialogSubmitButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (newToDoForm.reportValidity()) {
      const newToDoTitle = document.querySelector("#new-todo-title").value;
      const newToDoDescription = document.querySelector(
        "#new-todo-description"
      ).value;
      const newToDoDueDate = document.querySelector("#new-todo-due-date").value;
      const newToDoPriority = document.querySelector(
        `input[name="new-todo-priority"]:checked`
      ).value;
      const newToDoProjectID = document.querySelector(
        "#new-todo-project-dropdown"
      ).value;
      const newToDoNotes = document.querySelector("#new-todo-notes").value;

      createToDo(
        newToDoTitle,
        newToDoDescription,
        newToDoDueDate,
        newToDoPriority,
        newToDoNotes,
        "",
        newToDoProjectID
      );

      toDos = getToDos();
      populateProjects(getProjects());
      addProjectButtonEvents();
      populateToDoListContainer(newToDoProjectID);
      populateToDoListContainerHeader(newToDoProjectID);
      colorActiveProject(newToDoProjectID);
      addToDoButtonEvents();
      addDeleteProjectButtonEvents();
      changeCompletionStatusEvent();
      newToDoDialog.close();
    } else {
    }
  });
};

const addDeleteProjectButtonEvents = function () {
  const projectToDeleteButton = document.querySelector(
    ".delete-project-button"
  );

  const projectToDeleteID =
    projectToDeleteButton.getAttribute("data-project-id");

  const defaultProjectID = getProjects()[0]["id"];

  projectToDeleteButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this Project?")) {
      deleteProject(projectToDeleteID);
      toDoDetailsContainer.textContent = "";
      populateProjects(getProjects());
      populateProjectDropDown(getProjects());
      addProjectButtonEvents();
      defaultView();
      addDeleteProjectButtonEvents();
      addToDoButtonEvents();
      colorActiveProject(defaultProjectID);
      changeCompletionStatusEvent();
    }
  });
};

const editProjectTitleButton = function () {
  const editProjectTitleButton = document.querySelector(
    ".edit-project-title-button"
  );

  const editProjectTitleDialog = document.querySelector(
    "#edit-project-title-dialog"
  );

  editProjectTitleButton.addEventListener("click", () => {
    const projectToEditID =
      editProjectTitleButton.getAttribute("data-project-id");
    const editProjectTitleInput = document.querySelector("#edit-project-title");
    editProjectTitleInput.value = getProjectByID(projectToEditID)["name"];

    editProjectTitleDialog.showModal();
    editProjectTitleDialogCloseButton();
  });
};

const editProjectTitleDialogCloseButton = function () {
  const editProjectTitleDialogCloseButton = document.querySelector(
    "#edit-project-title-dialog-close-button"
  );

  const editProjectTitleDialog = document.querySelector(
    "#edit-project-title-dialog"
  );

  editProjectTitleDialogCloseButton.addEventListener("click", () => {
    editProjectTitleDialog.close();
  });
};

const editProjectTitleDialogSubmitButtonEvents = function () {
  const editProjectTitleDialogSubmitButton = document.querySelector(
    "#edit-project-title-dialog-submit-button"
  );
  const editProjectTitleDialog = document.querySelector(
    "#edit-project-title-dialog"
  );
  const activeProjectReference = document.querySelector(
    "#active-project-reference"
  );

  editProjectTitleDialogSubmitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const editProjectTitleForm = document.querySelector(
      "#edit-project-title-form"
    );

    const projectToEditID =
      activeProjectReference.getAttribute("data-project-id");

    const newProjectTitle = document.querySelector("#edit-project-title").value;

    let projectToEdit;

    projects = getProjects();

    if (editProjectTitleForm.reportValidity()) {
      projects.forEach(function (project) {
        if (project["id"] === projectToEditID) {
          projectToEdit = project;
        }
      });

      projectToEdit["name"] = newProjectTitle;
      console.log(projects);
      saveProjectsToStorage(projects);
      console.log(projects);
      populateProjects(projects);
      populateToDoListContainerHeader(projectToEdit["id"]);
      colorActiveProject(projectToEdit["id"]);
      addProjectButtonEvents();
      addDeleteProjectButtonEvents();
      addToDoButtonEvents();
      editProjectTitleButton();
      changeCompletionStatusEvent();
      editProjectTitleDialog.close();
    } else {
    }
  });
};

const addDeleteToDoButtonEvents = function (id) {
  const toDoToDelete = getToDoByID(id);
  const toDoToDeleteProjectID = toDoToDelete["projectID"];
  const deleteToDoButton = document.querySelector(".delete-todo-button");
  deleteToDoButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this To Do?")) {
      deleteToDo(id);
      toDoDetailsContainer.textContent = "";
      populateToDoListContainer(toDoToDeleteProjectID);
      populateToDoListContainerHeader(toDoToDeleteProjectID);
      addToDoButtonEvents();
      addDeleteProjectButtonEvents(toDoToDeleteProjectID);
      changeCompletionStatusEvent();
    } else {
    }
  });
};

// Edit To Do Title
const editToDoTitleButton = function () {
  const toDoTitleButton = document.querySelector("#edit-todo-title-button");
  const editToDoTitleForm = document.querySelector("#edit-todo-title-form");

  toDoTitleButton.addEventListener("click", () => {
    toDoDetailsContainer.textContent = "";
    const editToDoTitleInput = document.querySelector("#edit-todo-title");
    editToDoTitleInput.value = getActiveToDo()["title"];
    editToDoTitleForm.hidden = false;
    editToDoCancelButtons();
    editToDoTitleSubmitButton();
    mainNav.setAttribute("style", "pointer-events: none; opacity: 0.5");
    mainDisplay.setAttribute("style", "pointer-events: none; opacity: 0.5");
  });
};

const editToDoTitleSubmitButton = function () {
  const editToDoTitleForm = document.querySelector("#edit-todo-title-form");

  const toTitleDoSubmitButton = document.querySelector(
    "#edit-todo-title-submit-button"
  );
  toTitleDoSubmitButton.addEventListener("click", () => {
    const newValue = document.querySelector("#edit-todo-title").value;
    getActiveToDo()["title"] = newValue;
    saveToDosToStorage(toDos);
    editToDoTitleForm.hidden = true;
    populateToDoItemDetails(getActiveToDo()["id"]);
    populateToDoListContainer(getActiveToDo()["projectID"]);
    editFormButtons();
    addDeleteToDoButtonEvents(getActiveToDo()["id"]);
    changeCompletionStatusEvent();
    mainDisplay.setAttribute("style", "pointer-events: auto");
    mainNav.setAttribute("style", "pointer-events: auto");
  });
};

// Edit To Do Description
const editToDoDescriptionButton = function () {
  const toDoDescriptionButton = document.querySelector(
    "#edit-todo-description-button"
  );

  toDoDescriptionButton.addEventListener("click", () => {
    toDoDetailsContainer.textContent = "";
    const editToDoDescriptionForm = document.querySelector(
      "#edit-todo-description-form"
    );
    const editToDoDescriptionInput = document.querySelector(
      "#edit-todo-description"
    );
    editToDoDescriptionInput.value = getActiveToDo()["description"];
    editToDoDescriptionForm.hidden = false;
    editToDoCancelButtons();
    editToDoDescriptionSubmitButton();
    mainNav.setAttribute("style", "pointer-events: none; opacity: 0.5");
    mainDisplay.setAttribute("style", "pointer-events: none; opacity: 0.5");
  });
};

const editToDoDescriptionSubmitButton = function () {
  const editToDoDescriptionForm = document.querySelector(
    "#edit-todo-description-form"
  );

  const toDoDescriptionSubmitButton = document.querySelector(
    "#edit-todo-description-submit-button"
  );
  toDoDescriptionSubmitButton.addEventListener("click", () => {
    const newValue = document.querySelector("#edit-todo-description").value;
    getActiveToDo()["description"] = newValue;
    saveToDosToStorage(toDos);
    editToDoDescriptionForm.hidden = true;
    populateToDoItemDetails(getActiveToDo()["id"]);
    populateToDoListContainer(getActiveToDo()["projectID"]);
    editFormButtons();
    addDeleteToDoButtonEvents(getActiveToDo()["id"]);
    changeCompletionStatusEvent();
    mainDisplay.setAttribute("style", "pointer-events: auto");
    mainNav.setAttribute("style", "pointer-events: auto");
  });
};

// Edit To Do Due Date
const editToDoDueDateButton = function () {
  const toDoDueDateButton = document.querySelector(
    "#edit-todo-due-date-button"
  );

  toDoDueDateButton.addEventListener("click", () => {
    toDoDetailsContainer.textContent = "";
    const editToDoDueDateForm = document.querySelector(
      "#edit-todo-due-date-form"
    );
    const editToDoDueDateInput = document.querySelector("#edit-todo-due-date");
    editToDoDueDateInput.value = getActiveToDo()["dueDate"];
    editToDoDueDateForm.hidden = false;
    editToDoCancelButtons();
    editToDoDueDateSubmitButton();
    mainNav.setAttribute("style", "pointer-events: none; opacity: 0.5");
    mainDisplay.setAttribute("style", "pointer-events: none; opacity: 0.5");
  });
};

const editToDoDueDateSubmitButton = function () {
  const editToDoDueDateForm = document.querySelector(
    "#edit-todo-due-date-form"
  );

  const toDoDueDateSubmitButton = document.querySelector(
    "#edit-todo-due-date-submit-button"
  );
  toDoDueDateSubmitButton.addEventListener("click", () => {
    const newValue = document.querySelector("#edit-todo-due-date").value;
    console.log(newValue);
    getActiveToDo()["dueDate"] = newValue;
    saveToDosToStorage(toDos);
    editToDoDueDateForm.hidden = true;
    populateToDoItemDetails(getActiveToDo()["id"]);
    populateToDoListContainer(getActiveToDo()["projectID"]);
    editFormButtons();
    addDeleteToDoButtonEvents(getActiveToDo()["id"]);
    changeCompletionStatusEvent();
    mainDisplay.setAttribute("style", "pointer-events: auto");
    mainNav.setAttribute("style", "pointer-events: auto");
  });
};

// Edit To Due Priority
const editToDoPriorityButton = function () {
  const editToDoPriorityButton = document.querySelector(
    "#edit-todo-priority-button"
  );

  editToDoPriorityButton.addEventListener("click", () => {
    toDoDetailsContainer.textContent = "";
    const editToDoPriorityForm = document.querySelector(
      "#edit-todo-priority-form"
    );
    const editToDoPriorityRadioButtons = document.querySelectorAll(
      `input[type="radio"][name="edit-todo-priority"]`
    );
    editToDoPriorityRadioButtons.forEach(function (button) {
      if (button["value"] === getActiveToDo()["priority"]) {
        button.checked = true;
      }
    });
    editToDoPriorityForm.hidden = false;
    editToDoCancelButtons();
    editToDoPrioritySubmitButton();
    mainNav.setAttribute("style", "pointer-events: none; opacity: 0.5");
    mainDisplay.setAttribute("style", "pointer-events: none; opacity: 0.5");
  });
};

const editToDoPrioritySubmitButton = function () {
  const editToDoPriorityForm = document.querySelector(
    "#edit-todo-priority-form"
  );

  const toDoPrioritySubmitButton = document.querySelector(
    "#edit-todo-priority-submit-button"
  );
  toDoPrioritySubmitButton.addEventListener("click", () => {
    const newValue = document.querySelector(
      `input[name="edit-todo-priority"]:checked`
    ).value;
    getActiveToDo()["priority"] = newValue;
    saveToDosToStorage(toDos);
    editToDoPriorityForm.hidden = true;
    populateToDoItemDetails(getActiveToDo()["id"]);
    populateToDoListContainer(getActiveToDo()["projectID"]);
    editFormButtons();
    addDeleteToDoButtonEvents(getActiveToDo()["id"]);
    changeCompletionStatusEvent();
    mainDisplay.setAttribute("style", "pointer-events: auto");
    mainNav.setAttribute("style", "pointer-events: auto");
  });
};

// Edit To Do Notes
const editToDoNotesButton = function () {
  const editToDoNotesButton = document.querySelector("#edit-todo-notes-button");

  editToDoNotesButton.addEventListener("click", () => {
    toDoDetailsContainer.textContent = "";
    const editToDoNotesForm = document.querySelector("#edit-todo-notes-form");
    const editToDoNotesInput = document.querySelector("#edit-todo-notes");
    editToDoNotesInput.value = getActiveToDo()["notes"];
    editToDoNotesForm.hidden = false;
    editToDoCancelButtons();
    editToDoNotesSubmitButton();
    mainNav.setAttribute("style", "pointer-events: none; opacity: 0.5");
    mainDisplay.setAttribute("style", "pointer-events: none; opacity: 0.5");
  });
};

const editToDoNotesSubmitButton = function () {
  const editToDoNotesForm = document.querySelector("#edit-todo-notes-form");

  const toDoNotesSubmitButton = document.querySelector(
    "#edit-todo-notes-submit-button"
  );
  toDoNotesSubmitButton.addEventListener("click", () => {
    const newValue = document.querySelector("#edit-todo-notes").value;
    getActiveToDo()["notes"] = newValue;
    saveToDosToStorage(toDos);
    editToDoNotesForm.hidden = true;
    populateToDoItemDetails(getActiveToDo()["id"]);
    populateToDoListContainer(getActiveToDo()["projectID"]);
    editFormButtons();
    addDeleteToDoButtonEvents(getActiveToDo()["id"]);
    changeCompletionStatusEvent();
    mainDisplay.setAttribute("style", "pointer-events: auto");
    mainNav.setAttribute("style", "pointer-events: auto");
  });
};

// Edit To Do Project
const editToDoProjectButton = function () {
  const editToDoProjectButton = document.querySelector(
    "#edit-todo-project-button"
  );

  editToDoProjectButton.addEventListener("click", () => {
    const projectDropDown = document.querySelector(
      "#edit-todo-project-dropdown"
    );
    toDoDetailsContainer.textContent = "";
    const editToDoProjectForm = document.querySelector(
      "#edit-todo-project-form"
    );
    populateProjectDropDownEdit(getProjects());
    for (let i = 0; i < projectDropDown.options.length; i++) {
      if (projectDropDown.options[i].value === getActiveToDo()["projectID"]) {
        projectDropDown.options[i].selected = true;
        break;
      }
    }
    editToDoProjectForm.hidden = false;
    editToDoCancelButtons();
    editToDoProjectSubmitButton();
    mainNav.setAttribute("style", "pointer-events: none; opacity: 0.5");
    mainDisplay.setAttribute("style", "pointer-events: none; opacity: 0.5");
  });
};

const editToDoProjectSubmitButton = function () {
  const editToDoProjectForm = document.querySelector("#edit-todo-project-form");

  const toDoProjectSubmitButton = document.querySelector(
    "#edit-todo-project-submit-button"
  );
  toDoProjectSubmitButton.addEventListener("click", () => {
    const newValue = document.querySelector(
      "#edit-todo-project-dropdown"
    ).value;
    getActiveToDo()["projectID"] = newValue;
    saveToDosToStorage(toDos);
    editToDoProjectForm.hidden = true;
    populateToDoItemDetails(getActiveToDo()["id"]);
    populateToDoListContainerHeader(getActiveToDo()["projectID"]);
    populateToDoListContainer(getActiveToDo()["projectID"]);
    editFormButtons();
    addDeleteToDoButtonEvents(getActiveToDo()["id"]);
    changeCompletionStatusEvent();
    mainDisplay.setAttribute("style", "pointer-events: auto");
    mainNav.setAttribute("style", "pointer-events: auto");
  });
};

const editToDoCancelButtons = function () {
  const editToDoTitleForm = document.querySelector("#edit-todo-title-form");
  const editToDoDescriptionForm = document.querySelector(
    "#edit-todo-description-form"
  );
  const editToDoDueDateForm = document.querySelector(
    "#edit-todo-due-date-form"
  );
  const editToDoPriorityForm = document.querySelector(
    "#edit-todo-priority-form"
  );
  const editToDoNotesForm = document.querySelector("#edit-todo-notes-form");
  const editToDoProjectForm = document.querySelector("#edit-todo-project-form");

  const ToDoCancelButtons = document.querySelectorAll(
    ".edit-todo-cancel-button"
  );
  ToDoCancelButtons.forEach(function (button) {
    button.addEventListener("click", () => {
      populateToDoItemDetails(getActiveToDo()["id"]);
      addDeleteToDoButtonEvents(getActiveToDo()["id"]);
      editToDoDescriptionForm.hidden = true;
      editToDoTitleForm.hidden = true;
      editToDoTitleForm.hidden = true;
      editToDoDueDateForm.hidden = true;
      editToDoPriorityForm.hidden = true;
      editToDoNotesForm.hidden = true;
      editToDoProjectForm.hidden = true;
      mainDisplay.setAttribute("style", "pointer-events: auto");
      mainNav.setAttribute("style", "pointer-events: auto");
      editFormButtons();
    });
  });
};

const changeCompletionStatusEvent = function () {
  const toDoCheckBoxes = document.querySelectorAll(".completion-status");

  const activeProjectReference = document.querySelector(
    "#active-project-reference"
  );

  const activeProjectID =
  activeProjectReference.getAttribute("data-project-id");

  toDoCheckBoxes.forEach(function (toDoCheckBox) {
    toDoCheckBox.addEventListener("click", function (event) {
      const toDoToChange = event.target.getAttribute("data-todo-id");
      changeToDoCompletion(toDoToChange);
      populateToDoListContainer(activeProjectID);
      changeCompletionStatusEvent();
      addToDoButtonEvents();
    });
  });
};

const editFormButtons = function () {
  editToDoTitleButton();
  editToDoDescriptionButton();
  editToDoDueDateButton();
  editToDoPriorityButton();
  editToDoNotesButton();
  editToDoProjectButton();
};

export {
  addAllEvents,
  addNewProjectButtonEvents,
  addNewProjectDialogCloseButtonEvents,
  addNewProjectDialogSubmitButtonEvents,
  addNewToDoButtonEvents,
  addNewToDoDialogCloseButtonEvents,
  addNewToDoDialogSubmitButtonEvents,
  addProjectButtonEvents,
  addToDoButtonEvents,
  addDeleteProjectButtonEvents,
  addDeleteToDoButtonEvents,
  editToDoTitleButton,
};
