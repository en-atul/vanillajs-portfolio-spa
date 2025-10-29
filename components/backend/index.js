import { loadCSS, loadJSON } from "../../utils.js";

export class BackendPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.data = null;

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    // Inject CSS to the shadow DOM
    loadCSS("./components/backend/style.css").then((css) => {
      styles.textContent = css;
    });
  }

  async connectedCallback() {
    const template = document.getElementById("page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    // Load data
    const res = await loadJSON("./components/backend/data.json");
    this.data = res;

    this.render();
  }

  render() {
    if (!this.data) return;

    const projectContainer = this.root.querySelector("#projects");
    projectContainer.innerHTML = "";

    this.data.projects.forEach((project) => {
      const item = document.createElement("project-item");
      item.dataset.project = JSON.stringify({ ...project, icon: "database" });
      projectContainer.appendChild(item);
    });
  }
}
customElements.define("backend-page", BackendPage);
