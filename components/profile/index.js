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

    // Load profile data
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
    this.root.querySelector("#profile__based_in").textContent =
      this.data.based_in;
    // this.root.querySelector('#profile__social_media').textContent = this.data.social_media;
    // this.root.querySelector('#profile__stacks').textContent = this.data.stacks;
  }
}
customElements.define("profile-page", ProfilePage);
