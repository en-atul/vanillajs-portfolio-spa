import Router from "./router.js";
import { lucideInit, routeToPage } from "./utils.js";
import "./components/index.js";

const router = new Router();

const anchors = document.querySelectorAll("a.navlink");

anchors.forEach((anchor) => {
  anchor.addEventListener("click", (ev) => {
    ev.preventDefault();

    const path = ev.target.getAttribute("href");
    router.push(path);
  });
});

// Render Initial Page using History API pathname
routeToPage(window.location.pathname || "/");

// Route Change Listener
window.addEventListener("routechange", (ev) => {
  const path = ev.detail.path;
  routeToPage(path);

  // Reinitialize lucide
  lucideInit()

  // change active link color
  anchors.forEach((anchor) => {
    if (anchor.getAttribute("href") === path) {
      anchor.classList.add("active");
    } else {
      anchor.classList.remove("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  lucideInit();
});
