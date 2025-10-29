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

export { loadCSS, loadJSON };
