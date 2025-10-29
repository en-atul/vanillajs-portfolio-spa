import HTMLPage from "../page.js";
import { loadProjects } from "../utils.js";

const basePath = "./components/backend";

export class BackendPage extends HTMLPage {
  constructor() {
    super(basePath);
  }

  render() {
    if (!this.data) return;

    loadProjects(this.root, this.data.projects, "database");
  }
}
customElements.define("backend-page", BackendPage);
