import { loadCSS, loadJSON } from "../../utils.js";

export default class ProfilePage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.data = null;

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    // Inject CSS to the shadow DOM
    loadCSS("./components/profile/style.css").then((css) => {
      styles.textContent = css;
    });
  }

  async connectedCallback() {
    const template = document.getElementById("profile-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    // Load data
    const res = await loadJSON("./components/profile/data.json");
    this.data = res.profile;

    this.render();
  }

  render() {
    if (!this.data) return;

    const img = document.createElement("img");
    img.src = this.data.image;
    this.root.querySelector("#profile__image").appendChild(img);

    this.root.querySelector("#profile__name").textContent = this.data.name;
    this.root.querySelector("#profile__summary").textContent =
      this.data.summary;
    const basedInEl = this.root.querySelector("#profile__based_in");
    basedInEl.innerHTML = '<i data-lucide="map-pin"></i> ' + this.data.based_in;

    if (this.data.work_experience && this.data.work_experience.length > 0) {
      const experienceContainer = this.root.querySelector("#work_experience");
      if (experienceContainer) {
        experienceContainer.innerHTML = '';
        this.data.work_experience.forEach((exp) => {
          const expCard = document.createElement("div");
          expCard.className = "experience-card";
          expCard.innerHTML = `
            <div class="experience-header">
              <div class="experience-company">${exp.company}</div>
              <div class="experience-duration">${exp.duration}</div>
            </div>
            <div class="experience-position">${exp.position}</div>
            <div class="experience-description">${exp.description}</div>
            <div class="experience-tech">
              ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
          `;
          experienceContainer.appendChild(expCard);
        });
      }
    }
  }
}
customElements.define("profile-page", ProfilePage);
