const displayController = function () {
  const mainNavProjectsContainer = document.querySelector(
    "#main-nav-projects-container"
  );

  const populateProjects = function (projectsArray) {
    for (const project of projectsArray) {
      const projectElement = document.createElement("button");
      projectElement.textContent = project["name"];
      projectElement.setAttribute("data-id", project["id"]);
      mainNavProjectsContainer.appendChild(projectElement);
    }
  };

  const populateProjectDropDown = function(projectsArray) {
    const projectDropDown = document.querySelector("#project-dropdown");
    for (const project of projectsArray) {
      const dropDownOption = document.createElement("option")
      dropDownOption.setAttribute("value", project["id"]);
      dropDownOption.textContent = project["name"];
      projectDropDown.appendChild(dropDownOption);
    }
  }

  return { populateProjects, populateProjectDropDown };
};

export { displayController };
