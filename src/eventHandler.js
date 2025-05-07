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

let activeToDo = {};

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
      activeToDo = getToDoByID(id);
      console.log(activeToDo);
      console.log(id);
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

const editToDoTitleButton = function () {
  const toDoTitleButton = document.querySelector("#edit-todo-title-button");

  toDoTitleButton.addEventListener("click", () => {
    toDoDetailsContainer.textContent = "";
    const editToDoTitleForm = document.querySelector("#edit-todo-title-form");
    const editToDoTitleInput = document.querySelector("#edit-todo-title");
    editToDoTitleInput.value = activeToDo["title"];
    editToDoTitleForm.hidden = false;
    editToDoCancelButtons();
    editToDoTitleSubmitButton();
  });
};

const editToDoTitleSubmitButton = function () {
  const editToDoTitleForm = document.querySelector("#edit-todo-title-form");

  const toTitleDoSubmitButton = document.querySelector(
    "#edit-todo-title-submit-button"
  );
  toTitleDoSubmitButton.addEventListener("click", () => {
    const newValue = document.querySelector("#edit-todo-title").value;
    activeToDo["title"] = newValue;
    editToDoTitleForm.hidden = true;
    populateToDoItemDetails(activeToDo["id"]);
    populateToDoListContainer(activeToDo["projectID"]);
    editFormButtons();
    addDeleteToDoButtonEvents(activeToDo["id"]);
  });
};

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
    editToDoDescriptionInput.value = activeToDo["description"];
    editToDoDescriptionForm.hidden = false;
    editToDoCancelButtons();
    editToDoDescriptionSubmitButton();
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
    activeToDo["description"] = newValue;
    editToDoDescriptionForm.hidden = true;
    populateToDoItemDetails(activeToDo["id"]);
    populateToDoListContainer(activeToDo["projectID"]);
    editFormButtons();
    addDeleteToDoButtonEvents(activeToDo["id"]);
  });
};

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
    editToDoDueDateInput.value = activeToDo["dueDate"];
    editToDoDueDateForm.hidden = false;
    editToDoCancelButtons();
    editToDoDueDateSubmitButton();
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
    activeToDo["dueDate"] = newValue;
    editToDoDueDateForm.hidden = true;
    populateToDoItemDetails(activeToDo["id"]);
    populateToDoListContainer(activeToDo["projectID"]);
    editFormButtons();
    addDeleteToDoButtonEvents(activeToDo["id"]);
  });
};

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
      if (button["value"] === activeToDo["priority"]) {
        button.checked = true;
      }
    });
    editToDoPriorityForm.hidden = false;
    editToDoCancelButtons();
    editToDoPrioritySubmitButton();
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
    activeToDo["priority"] = newValue;
    editToDoPriorityForm.hidden = true;
    populateToDoItemDetails(activeToDo["id"]);
    populateToDoListContainer(activeToDo["projectID"]);
    editFormButtons();
    addDeleteToDoButtonEvents(activeToDo["id"]);
  });
};

const editToDoNotesButton = function () {
  const editToDoNotesButton = document.querySelector("#edit-todo-notes-button");

  editToDoNotesButton.addEventListener("click", () => {
    toDoDetailsContainer.textContent = "";
    const editToDoNotesForm = document.querySelector("#edit-todo-notes-form");
    const editToDoNotesInput = document.querySelector("#edit-todo-notes");
    editToDoNotesInput.value = activeToDo["notes"];
    editToDoNotesForm.hidden = false;
    editToDoCancelButtons();
    editToDoNotesSubmitButton();
  });
};

const editToDoNotesSubmitButton = function () {
  const editToDoNotesForm = document.querySelector(
    "#edit-todo-notes-form"
  );

  const toDoNotesSubmitButton = document.querySelector(
    "#edit-todo-notes-submit-button"
  );
  toDoNotesSubmitButton.addEventListener("click", () => {
    const newValue = document.querySelector("#edit-todo-notes").value;
    activeToDo["notes"] = newValue;
    editToDoNotesForm.hidden = true;
    populateToDoItemDetails(activeToDo["id"]);
    populateToDoListContainer(activeToDo["projectID"]);
    editFormButtons();
    addDeleteToDoButtonEvents(activeToDo["id"]);
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
  const editToDoNotesForm = document.querySelector(
    "#edit-todo-notes-form"
  );

  const ToDoCancelButtons = document.querySelectorAll(
    ".edit-todo-cancel-button"
  );
  ToDoCancelButtons.forEach(function (button) {
    button.addEventListener("click", () => {
      populateToDoItemDetails(activeToDo["id"]);
      addDeleteToDoButtonEvents(activeToDo["id"]);
      editToDoDescriptionForm.hidden = true;
      editToDoTitleForm.hidden = true;
      editToDoTitleForm.hidden = true;
      editToDoDueDateForm.hidden = true;
      editToDoPriorityForm.hidden = true;
      editToDoNotesForm.hidden = true;
      editFormButtons();
    });
  });
};

const editFormButtons = function () {
  editToDoTitleButton();
  editToDoDescriptionButton();
  editToDoDueDateButton();
  editToDoPriorityButton();
  editToDoNotesButton();
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
