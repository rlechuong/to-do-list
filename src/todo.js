class ToDo {
  constructor(
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    projectID
  ) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.projectID = projectID;
  }

  setTitle(newTitle) {
    this.title = newTitle;
  }
}

export { ToDo };
