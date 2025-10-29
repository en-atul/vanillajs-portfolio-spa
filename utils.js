async function loadJSON(path) {
  try {
    const response = await fetch(path);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to load JSON: ${path}`, error);
    return {};
  }
}

async function loadCSS(path) {
  try {
    const request = await fetch(path);
    const css = await request.text();
    return css;
  } catch (error) {
    console.error(`Failed to load CSS: ${path}`, error);
    return "";
  }
}

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

function routeToPage(path) {
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
  }

  render(pageElement);
}

function lucideInit() {
  setTimeout(() => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      // Initialize icons in main document
      window.lucide.createIcons();

      // Initialize icons in all shadow DOMs
      document.querySelectorAll("*").forEach((el) => {
        if (el.shadowRoot) {
          window.lucide.createIcons({ root: el.shadowRoot });
        }
      });
    }
  }, 100);
}

export { loadCSS, loadJSON, routeToPage, lucideInit };
