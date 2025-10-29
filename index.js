import Router from "./router.js";
import "./components/web-component.js";

const router = new Router();

const anchors = document.querySelectorAll("a.navlink");

anchors.forEach((anchor) => {
  anchor.addEventListener("click", (ev) => {
    ev.preventDefault();

    const path = ev.target.getAttribute("href");
    router.push(path);
  });
});


function render(pageElement) {
  if (pageElement) {
    const cache = document.querySelector("main");
    cache.innerHTML = "";
    cache.appendChild(pageElement);
    window.scrollX = 0;
    window.scrollY = 0;
  } else {
    document.querySelector("main").innerHTML = "404! Page Not Found";
  }
}

// Render the home page
const homePage = document.createElement("profile-page");
render(homePage);

window.addEventListener("routechange", (ev) => {
  const path = ev.detail.path;
//   const state = ev.detail.state;

console.log("---path changed:", path);

  let pageElement = null;
  switch (path) {
    case "/":
    case "/index.html":
      pageElement = document.createElement("profile-page");
      break;
    case "/frontend":
      pageElement = document.createElement("frontend-page");
      break;
    case "/backend":
      pageElement = document.createElement("backend-page");
      break;
    case "/fullstack":
      pageElement = document.createElement("fullstack-page");
      break;
    default:
      if (route.startsWith("/product-")) {
        pageElement = document.createElement("details-page");
        const paramId = route.substring(route.lastIndexOf("-") + 1);
        pageElement.dataset.productId = paramId;
      }

      render(pageElement);
  }
});
