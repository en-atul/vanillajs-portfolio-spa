export default class ProjectItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("project-item-template");
    const content = template.content.cloneNode(true);

    this.appendChild(content);

    const project = JSON.parse(this.dataset.project);

    this.querySelector("h4.project__title").textContent = product.title;
    this.querySelector("p.project__description").textContent =
      project.description;
    // this.querySelector("img").src = `data/images/${product.image}`;
    // this.querySelector("a").addEventListener("click", event => {
    //     if (event.target.tagName.toLowerCase()=="button") {
    //         addToCart(product.id);
    //     } else {
    //         app.router.go(`/product-${product.id}`);
    //     }
    //     event.preventDefault();
    // })
  }
}

customElements.define("project-item", ProjectItem);
