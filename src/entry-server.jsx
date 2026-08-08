import { renderToString } from "react-dom/server";
import App from "./App.jsx";

// Used only at build time by scripts/prerender.mjs to bake the markup
// into dist/index.html. Never shipped to the browser.
export function render() {
  return renderToString(<App />);
}
