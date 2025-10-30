import HTMLPage from "../page.js";

const basePath = "./components/profile";

export default class ProfilePage extends HTMLPage {
  constructor() {
    super(basePath, "profile-template");
  }

  render() {
    if (!this.data.profile) return;

    const img = document.createElement("img");
    img.src = this.data.profile.image;
    this.root.querySelector("#profile__image").appendChild(img);

    this.root.querySelector("#profile__name").textContent = this.data.profile.name;
    this.root.querySelector("#profile__summary").textContent =
      this.data.profile.summary;
    const basedInEl = this.root.querySelector("#profile__based_in");
    basedInEl.innerHTML = '<i data-lucide="map-pin"></i> ' + this.data.profile.based_in;

    if (this.data.profile.work_experience && this.data.profile.work_experience.length > 0) {
      const experienceContainer = this.root.querySelector("#work_experience");
      if (experienceContainer) {
        experienceContainer.innerHTML = '';
        this.data.profile.work_experience.forEach((exp) => {
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
