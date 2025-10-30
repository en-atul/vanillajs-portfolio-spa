import Router from "./router.js";
import { lucideInit, routeToPage, highlightActiveLink } from "./utils.js";

window.anchors = [];

const router = new Router();

document.addEventListener("DOMContentLoaded", async function () {
  // Render Initial Page
  await routeToPage(window.location.pathname || "/");

  window.anchors = document.querySelectorAll("a.navlink");

  highlightActiveLink();
  lucideInit();
});

// Click Listener
document.addEventListener("click", (ev) => {
  ev.preventDefault();
  if (ev.target.tagName === "A") {
    const path = ev.target.getAttribute("href");
    router.push(path);
  }
});

// Route Change Listener
window.addEventListener("routechange", async (ev) => {
  const path = ev.detail.path;
  await routeToPage(path);

  // Reinitialize lucide
  lucideInit();

  // change active link color
  highlightActiveLink(path);
});
