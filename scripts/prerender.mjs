// Bakes the rendered app into dist/index.html so crawlers and link-preview
// bots get real text instead of an empty <div id="root">.
// Runs after `vite build` and `vite build --ssr` (see package.json).
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = resolve(root, "dist/index.html");
const PLACEHOLDER = '<div id="root"></div>';

const { render } = await import(resolve(root, "dist-ssr/entry-server.js"));
const appHtml = render();

const template = readFileSync(indexPath, "utf8");

if (!template.includes(PLACEHOLDER)) {
  throw new Error(
    `prerender: could not find ${PLACEHOLDER} in dist/index.html — nothing was injected.`
  );
}

if (appHtml.trim().length === 0) {
  throw new Error("prerender: render() produced empty markup.");
}

writeFileSync(
  indexPath,
  template.replace(PLACEHOLDER, `<div id="root">${appHtml}</div>`)
);

const text = appHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
console.log(`prerender: injected ${appHtml.length} bytes of HTML (${text.length} bytes of text)`);
