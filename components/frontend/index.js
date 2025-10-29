import HTMLPage from "../page.js";
import { loadProjects } from "../utils.js";

const basePath = "./components/frontend";

export class FrontendPage extends HTMLPage {
  constructor() {
    super(basePath);
  }

  render() {
    if (!this.data) return;

    loadProjects(this.root, this.data.projects, "monitor-smartphone");
  }
}
customElements.define("frontend-page", FrontendPage);
