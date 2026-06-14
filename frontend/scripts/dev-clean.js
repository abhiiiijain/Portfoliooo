const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const { loadEnv } = require("./loadEnv");

const root = path.join(__dirname, "..");
const env = { ...process.env, ...loadEnv(path.join(root, ".env")) };

function killPort(port) {
  if (process.platform !== "win32") return;

  try {
    const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8" });
    const pids = new Set();

    for (const line of out.split("\n")) {
      if (!line.includes("LISTENING")) continue;
      const pid = line.trim().split(/\s+/).pop();
      if (pid && pid !== "0") pids.add(pid);
    }

    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
        console.log(`Stopped process ${pid} on port ${port}`);
      } catch {
        /* already gone */
      }
    }
  } catch {
    /* nothing listening */
  }
}

if (env.PORT) killPort(Number(env.PORT));

const nextDir = path.join(root, ".next");
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log("Removed .next cache");
}

console.log(`Starting dev server${env.PORT ? ` on port ${env.PORT}` : ""}…\n`);

spawn("npx", ["next", "dev"], {
  stdio: "inherit",
  shell: true,
  cwd: root,
  env,
});
