import { loadCSS, loadJSON } from "../utils.js";

export default class HTMLPage extends HTMLElement {
  constructor(path, templateId = "page-template") {
    super();
    this.path = path;
    this.templateId = templateId;
    this.root = this.attachShadow({ mode: "open" });
    this.data = null;

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    // Inject CSS to the shadow DOM
    loadCSS(`${path}/style.css`).then((css) => {
      styles.textContent = css;
    });
  }

  async connectedCallback() {
    const template = document.getElementById(this.templateId);
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    // Load data
    const res = await loadJSON(`${this.path}/data.json`);
    this.data = res;

    if (typeof this.render === "function") {
      this.render();
    }
  }
}
