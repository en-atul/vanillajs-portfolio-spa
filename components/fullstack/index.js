import HTMLPage from "../page.js";
import { loadProjects } from "../utils.js";

const basePath = "./components/fullstack";

export class FullstackPage extends HTMLPage {
  constructor() {
    super(basePath);
  }

  render() {
    if (!this.data) return;

    loadProjects(this.root, this.data.projects, "layers");
  }
}
customElements.define("fullstack-page", FullstackPage);
