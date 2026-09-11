import { access, cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "public");
const entries = ["index.html", "quiz.html", "assets", "css", "js", "lang", "sources"];

await mkdir(output, { recursive: true });

let copied = 0;
let preserved = 0;
for (const entry of entries) {
  const source = path.join(root, entry);
  const destination = path.join(output, entry);

  // Hero assets are checked in under public/assets, while source copies are
  // intentionally ignored. Preserve that deploy-safe fallback on CI.
  if (entry === "assets") {
    try {
      await access(source);
    } catch {
      try {
        await access(destination);
        preserved += 1;
        continue;
      } catch {
        throw new Error("Missing assets source and public/assets fallback.");
      }
    }
  }

  await rm(destination, { recursive: true, force: true });
  await cp(source, destination, { recursive: true });
  copied += 1;
}

await cp(path.join(root, "_headers"), path.join(output, "_headers"));
console.log("Prepared " + copied + " asset entries in " + path.relative(root, output) + "/" + (preserved ? " Preserved " + preserved + " fallback entry." : ""));