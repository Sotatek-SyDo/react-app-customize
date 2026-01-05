import { spawnSync } from "node:child_process";

// Get client name from CLI args or env var
// Usage: npm run dev lifelog
// or: CLIENT=lifelog npm run dev
const clientArg = process.argv[2]; // Argument from CLI
const clientEnv = process.env.CLIENT; // Env var
const client = clientArg || clientEnv || "default";

console.log(`🚀 Starting dev server for client: ${client}`);

const res = spawnSync(
  "yarn",
  ["vite"],
  {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, VITE_CLIENT: client }
  }
);

process.exit(res.status ?? 0);