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
    this.completed = false;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.projectID = projectID;
  }
}

export { ToDo };
