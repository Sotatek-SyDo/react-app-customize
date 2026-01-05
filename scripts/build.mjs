import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const customizeDir = path.join(root, "customize");

function listClients() {
  if (!fs.existsSync(customizeDir)) return [];
  return fs
    .readdirSync(customizeDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

function run(cmd, args, env = {}) {
  const res = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, ...env }
  });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

// Get client name from CLI args
// Usage: npm run build lifelog  → build single client
// Usage: npm run build          → build all clients
const clientArg = process.argv[2];

if (clientArg) {
  // Single client build
  console.log(`📦 Building single client: ${clientArg}`);
  run("yarn", ["vite", "build"], { VITE_CLIENT: clientArg });
  console.log(`\n✅ Done. Output in dist/`);
} else {
  // Batch build all clients
  const clients = listClients();
  const targets = ["default", ...clients];

  for (const client of targets) {
    console.log(`\n=== Building: ${client} ===`);
    run("yarn", ["vite", "build"], { VITE_CLIENT: client });
  }

  console.log("\n✅ Done. Outputs in dist/<client>");
}