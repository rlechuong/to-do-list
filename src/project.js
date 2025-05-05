class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.todos = [];
  }

  addToDo(toDo) {
    this.todos.push(toDo);
  }
}

export { Project };
