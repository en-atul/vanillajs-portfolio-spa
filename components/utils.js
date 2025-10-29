function loadProjects(root, projects, icon) {
  const projectContainer = root.querySelector("#projects");
  projectContainer.innerHTML = "";

  projects.forEach((project) => {
    const item = document.createElement("project-item");
    item.dataset.project = JSON.stringify({ ...project, icon });
    projectContainer.appendChild(item);
  });
}

export { loadProjects };
