# SPA v1 — Vanilla JS Single-Page App

An educational example showing how to build a Single‑Page Application (SPA) using only Vanilla JavaScript, Custom Elements (Web Components), and the History API for clean URLs.

It demonstrates:

- Client‑side routing with clean paths like `/frontend`, `/backend`, `/fullstack`
- Componentized UI using Web Components and Shadow DOM
- Fetching JSON/CSS at runtime (no bundler required)

## Why a plain static file server won’t work

In a SPA, routes like `/frontend` are handled entirely in the browser. On a full page reload, a plain static server looks for a real file at `/frontend` and returns `404 Not Found` because it doesn’t exist on disk. The browser never gets `index.html`, so your client router can’t boot.

You need a server with a “history fallback” (aka SPA fallback): any unknown path should serve `index.html`, and the client router renders the correct view.

Symptoms when using a plain static server:

- Reloading `/frontend` (or opening it directly) returns 404
- Deep links don’t work

## Run locally (with history fallback)

Option A — serve (minimal, recommended)

```
npx serve -s .
```

`-s` enables SPA fallback so all unknown routes are rewritten to `index.html`.

Option B — http-server (proxy trick)

```
npx http-server -p 3000 --silent --proxy http://localhost:3000?
```

The `--proxy` option enables a similar fallback behavior.

Option C — Vite dev server

```
npm create vite@latest spa-v1 -- --template vanilla
# move this repo's files into the new project as needed
npm run dev
```

Vite includes history fallback out of the box.

## Project scripts (optional)

If you’d like, we can add a small Node/Express dev server with an explicit fallback so you can run:

```
npm start
```

## Notes

- Clean URLs are preserved via the History API. If you prefer hash routes (`/#/frontend`), you can switch, but clean URLs + fallback is closer to production setups.
- JSON imports are fetched at runtime to avoid MIME-type issues when importing `.json` as modules.
