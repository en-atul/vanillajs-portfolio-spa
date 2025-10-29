import { loadCSS, loadJSON } from "../../utils.js";

export class FullstackPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.data = null;

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    // Inject CSS to the shadow DOM
    loadCSS("./components/fullstack/style.css").then((css) => {
      styles.textContent = css;
    });
  }

  // when the component is attached to the DOM
  async connectedCallback() {
    const template = document.getElementById("frontend-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    // Load profile data
    const res = await loadJSON("./components/fullstack/data.json");
    this.data = res;

    this.render();
  }

  render() {
    if (!this.data) return;

    this.root.querySelector("#menu").innerHTML = "";
    for (let category of app.store.menu) {
      const liCategory = document.createElement("li");
      liCategory.innerHTML = `
                    <h3>${category.name}</h3>
                    <ul class='category'>                    
                    </ul>
                `;
      this.root.querySelector("#menu").appendChild(liCategory);

      category.products.forEach((product) => {
        const item = document.createElement("product-item");
        item.dataset.product = JSON.stringify(product);
        liCategory.querySelector("ul").appendChild(item);
      });
    }
  }
}
customElements.define("fullstack-page", FullstackPage);
