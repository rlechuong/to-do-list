import {
  getProjects,
  getToDos,
  createProject,
  createDefaultProject,
  createToDo,
  deleteProject,
  deleteToDo,
} from "./storage.js";
import {
  populateProjects,
  populateProjectDropDown,
  populateToDoListContainerHeader,
  populateToDoListContainer,
  populateToDoItemDetails,
  defaultView,
} from "./displayController.js";
import { getToDoByID } from "./filters.js";

const newToDoDialog = document.querySelector("#new-todo-dialog");
const newProjectDialog = document.querySelector("#new-project-dialog");
const toDoListContainer = document.querySelector("#todo-list-container");
const toDoDetailsContainer = document.querySelector("#todo-details-container");

const addAllEvents = function () {
  addNewToDoButtonEvents();
  addNewToDoDialogCloseButtonEvents();
  addNewProjectDialogCloseButtonEvents();
  addNewToDoDialogSubmitButtonEvents();
  addProjectButtonEvents();
  addToDoButtonEvents();
  addNewProjectButtonEvents();
  addNewProjectDialogSubmitButtonEvents();
  addDeleteProjectButtonEvents();
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

      populateProjects(getProjects());
      populateProjectDropDown(getProjects());
      populateToDoListContainerHeader(getProjects()[latestProjectIndex]["id"]);
      populateToDoListContainer(getProjects()[latestProjectIndex]["id"]);
      addDeleteProjectButtonEvents();
      addProjectButtonEvents();

      newProjectDialog.close();
    } else {
    }
  });
};

const addNewToDoButtonEvents = function () {
  const newToDoButton = document.querySelector("#new-todo-button");

  newToDoButton.addEventListener("click", () => {
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

const addProjectButtonEvents = function () {
  const projectButtonList = document.querySelectorAll(".project-button");

  projectButtonList.forEach(function (button) {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-project-id");
      populateToDoListContainer(id);
      populateToDoListContainerHeader(id);
      addDeleteProjectButtonEvents();
      addToDoButtonEvents();
    });
  });
};

const addToDoButtonEvents = function () {
  const toDoButtonList = document.querySelectorAll(".todo-button");

  toDoButtonList.forEach(function (button) {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-todo-id");
      console.log(id);
      populateToDoItemDetails(id);
      addDeleteToDoButtonEvents(id);
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

      populateToDoListContainer(newToDoProjectID);
      populateToDoListContainerHeader(newToDoProjectID);
      addToDoButtonEvents();
      addDeleteProjectButtonEvents();
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
  console.log(projectToDeleteID);

  //fix this need to remove details pane and also add event to to do
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
    } else {
    }
  });
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
};
