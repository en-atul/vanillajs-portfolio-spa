// Cache for JSON data
const jsonCache = new Map();

async function loadJSON(path) {
  if (jsonCache.has(path)) {
    return jsonCache.get(path);
  }

  try {
    const response = await fetch(path);
    const data = await response.json();

    jsonCache.set(path, data);
    return data;
  } catch (error) {
    console.error(`Failed to load JSON: ${path}`, error);
    return {};
  }
}

// Cache for CSS data
const cssCache = new Map();

async function loadCSS(path) {
  if (cssCache.has(path)) {
    return cssCache.get(path);
  }

  try {
    const request = await fetch(path);
    const css = await request.text();

    cssCache.set(path, css);
    return css;
  } catch (error) {
    console.error(`Failed to load CSS: ${path}`, error);
    return "";
  }
}

// Cache for main element
let mainElement = null;

function getMainElement() {
  if (!mainElement) {
    mainElement = document.querySelector("main");
  }
  return mainElement;
}

function render(pageElement) {
  const main = getMainElement();
  if (pageElement) {
    main.innerHTML = "";
    main.appendChild(pageElement);
    window.scrollX = 0;
    window.scrollY = 0;
  } else {
    main.innerHTML = "404! Page Not Found";
  }
}

async function loadComponent(componentName, pathname) {
  try {
    if (!customElements.get(componentName)) {
      const module = await import(`./components/${pathname}/index.js`);
      customElements.define(componentName, module.default);
    }
  } catch (error) {
    console.error(`Failed to load component: ${componentName}`, error);
    return null;
  }
}

async function routeToPage(path) {
  let pageElement = null;
  let pathname = null;

  switch (path) {
    case "/":
    case "/index.html":
      pathname = "profile";
      break;
    case "/frontend":
      pathname = "frontend";
      break;
    case "/backend":
      pathname = "backend";
      break;
    case "/fullstack":
      pathname = "fullstack";
      break;
    default:
      pathname = null;
  }

  const shouldLoadProject = ["frontend", "backend", "fullstack"].includes(
    pathname
  );

  if (pathname) {
    let componentName = `${pathname}-page`;

    if (shouldLoadProject) {
      await Promise.all([
        loadComponent(componentName, pathname),
        loadComponent("project-item", "project"),
      ]);
    } else {
      await loadComponent(componentName, pathname);
    }

    pageElement = document.createElement(componentName);
  }

  render(pageElement);
}

function lucideInit() {
  requestAnimationFrame(() => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      // initialize icons 
      window.lucide.createIcons();

      document.querySelectorAll("*").forEach((el) => {
        if (el.shadowRoot) {
          window.lucide.createIcons({ root: el.shadowRoot });
        }
      });
    }
  });
}

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle utility function for high-frequency events
function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Memory cleanup utility
// Clear caches if they get too large
function cleanup() {
  if (jsonCache.size > 50) {
    jsonCache.clear();
  }
  if (cssCache.size > 50) {
    cssCache.clear();
  }
  if (componentCache.size > 20) {
    componentCache.clear();
  }
}

function highlightActiveLink(path = window.location.pathname) {
  window.anchors.forEach((anchor) => {
    if (anchor.getAttribute("href") === path) {
      anchor.classList.add("active");
    } else {
      anchor.classList.remove("active");
    }
  });
}

export {
  loadCSS,
  loadJSON,
  routeToPage,
  lucideInit,
  highlightActiveLink,
  debounce,
  throttle,
  cleanup,
};
