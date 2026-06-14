const { spawn } = require("child_process");
const path = require("path");
const { loadEnv } = require("./loadEnv");

const root = path.join(__dirname, "..");
const env = { ...process.env, ...loadEnv(path.join(root, ".env")) };

spawn("npx", ["next", "dev"], {
  stdio: "inherit",
  shell: true,
  cwd: root,
  env,
});
