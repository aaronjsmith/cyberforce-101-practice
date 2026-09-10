import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "public");
const entries = ["index.html", "quiz.html", "css", "js", "lang", "sources"];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of entries) {
  await cp(path.join(root, entry), path.join(output, entry), { recursive: true });
}

await cp(path.join(root, "_headers"), path.join(output, "_headers"));
console.log(`Prepared ${entries.length} asset entries in ${path.relative(root, output)}/`);
