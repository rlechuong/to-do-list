import {
  getProjects,
  getToDos,
  createProject,
  createDefaultProject,
  createToDo,
} from "./storage.js";

const newToDoDialog = document.querySelector("#new-todo-dialog");

const addAllEvents = function () {
  addNewToDoButtonEvents();
  addNewToDoDialogCloseButtonEvents();
  addNewToDoDialogSubmitButtonEvents();
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

const addNewToDoDialogSubmitButtonEvents = function () {
  const newToDoDialogSubmitButton = document.querySelector(
    "#new-todo-dialog-submit-button"
  );

  newToDoDialogSubmitButton.addEventListener("click", (event) => {
    event.preventDefault();

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

    createToDo(
      newToDoTitle,
      newToDoDescription,
      newToDoDueDate,
      newToDoPriority,
      "",
      "",
      newToDoProjectID
    );

    console.log(getToDos());
  });
};

export { addAllEvents };
