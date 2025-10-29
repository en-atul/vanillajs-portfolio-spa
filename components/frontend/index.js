import { loadCSS, loadJSON } from "../../utils.js";

export class FrontendPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.data = null;

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    // Inject CSS to the shadow DOM
    loadCSS("./components/frontend/style.css").then((css) => {
      styles.textContent = css;
    });
  }

  // when the component is attached to the DOM
  async connectedCallback() {
    const template = document.getElementById("page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    // Load profile data
    const res = await loadJSON("./components/frontend/data.json");
    this.data = res;

    this.render();
  }

  render() {
    if (!this.data) return;

    const projectContainer = this.root.querySelector("#projects");
    projectContainer.innerHTML = "";
    
    this.data.projects.forEach((project) => {
      const item = document.createElement("project-item");
      item.dataset.project = JSON.stringify({ ...project, icon: "monitor-smartphone" });
      projectContainer.appendChild(item);
    });
  }
}
customElements.define("frontend-page", FrontendPage);
