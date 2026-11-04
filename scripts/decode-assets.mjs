// Decodes base64-stored binary assets (fonts, images) into public/ at build
// time. The repo transport used for automated pushes is text-only, so binary
// files live as .b64 text under assets-b64/ and are materialized here before
// Vite copies public/ into dist. Run automatically as the first build step.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcRoot = join(root, "assets-b64");
let count = 0;
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".b64")) {
      const rel = relative(srcRoot, p).replace(/\.b64$/, "");
      const dest = join(root, "public", rel);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, Buffer.from(readFileSync(p, "utf8").trim(), "base64"));
      count++;
    }
  }
};
if (existsSync(srcRoot)) { walk(srcRoot); console.log(`[decode-assets] materialized ${count} binary asset(s) into public/`); }
