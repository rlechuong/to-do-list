class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
  }
}

export { Project };
