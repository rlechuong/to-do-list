class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
  }

  setName(newName) {
    this.name = newName;
  }
}

export { Project };
