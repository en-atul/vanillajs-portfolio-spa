import Router from "./router.js";
import { routeToPage } from "./utils.js";
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

// Render Initial Page
routeToPage(window.location.pathname);

// Route Change Listener
window.addEventListener("routechange", (ev) => {
  const path = ev.detail.path;
  routeToPage(path);
});
