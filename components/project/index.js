export default class ProjectItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("project-item-template");
    const content = template.content.cloneNode(true);

    this.appendChild(content);

    const project = JSON.parse(this.dataset.project);

    const titleEl = this.querySelector("h4.project__title");
    titleEl.innerHTML = `<i data-lucide="${project.icon}"></i> ` + project.title;
    this.querySelector("p.project__description").textContent =
      project.description;

    // Technologies badges
    const stackEl = this.querySelector("p.project__stack");
    stackEl.innerHTML = "";
    const techs = project.technologies || project.stack || [];

    techs.forEach((t) => {
      const badge = document.createElement("span");
      badge.className = "tech-badge";
      badge.textContent = t;
      stackEl.appendChild(badge);
    });

    // Links with icons
    const linksEl = this.querySelector(".project__links");
    linksEl.innerHTML = "";
    const addLink = (href, text, iconName) => {
      if (!href) return;
      const a = document.createElement("a");
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = `<i data-lucide="${iconName}"></i> ${text}`;
      linksEl.appendChild(a);
    };

    addLink(project.link, "Live", "external-link");
    addLink(project.github, "GitHub", "github");
  }
}

customElements.define("project-item", ProjectItem);
