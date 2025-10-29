class Router {
    static #instance = null;
  
    #state = {};
    #currentPath = '';
  
    constructor() {
      if (Router.#instance) {
        throw new Error('Router: Only one instance can be created.');
      }
  
      Router.#instance = this;
      this.#init();
    }
  
    static getInstance() {
      if (!Router.#instance) {
        Router.#instance = new Router();
      }
      return Router.#instance;
    }
  
    #init() {
      window.addEventListener('popstate', (ev) => {
        const path = ev.state?.path || window.location.pathname;
        console.log('popstate fired', path, ev.state);
        this.navigate(path, ev.state, false);
      });
  
      const basePath = window.location.pathname || '/';
      history.replaceState({ path: basePath }, '', basePath);
      this.navigate(basePath, { path: basePath }, false);
    }
  
  
    push(path, state = {}) {
      this.navigate(path, state, true);
    }
  
    replace(path, state = {}) {
      this.navigate(path, state, true, true);
    }
  
    navigate(path, state = {}, updateHistory = true, replace = false) {
      if (typeof path !== 'string' || !path.startsWith('/')) {
        throw new Error('Router: Invalid path.');
      }
  
      this.#currentPath = path;
      this.#state = { ...state };
  
      if (updateHistory) {
        const historyMethod = replace ? 'replaceState' : 'pushState';
        history[historyMethod]({ path, ...state }, '', path);
      }
  
      this.#onRouteChange(path, state);
    }
  
    // --- Internal hook (override or listen externally) ---
    #onRouteChange(path, state) {
      window.dispatchEvent(
        new CustomEvent('routechange', { detail: { path, state } })
      );
    }
  
    get currentPath() {
      return this.#currentPath;
    }
  
    get state() {
      return { ...this.#state };
    }
  }
  
  export default Router;
  