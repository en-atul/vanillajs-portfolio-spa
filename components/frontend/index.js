import { loadCSS, loadJSON } from "../../utils.js";
import { loadProjects } from "../utils.js";

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

  async connectedCallback() {
    const template = document.getElementById("page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    // Load data
    const res = await loadJSON("./components/frontend/data.json");
    this.data = res;

    this.render();
  }

  render() {
    if (!this.data) return;

    loadProjects(this.root, this.data.projects, "monitor-smartphone");
  }
}
customElements.define("frontend-page", FrontendPage);
