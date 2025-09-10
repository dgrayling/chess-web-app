import react from "@vitejs/plugin-react-swc";
import { execSync } from "child_process";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(() => {
  // Get the current git commit hash and message
  const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
  const commitMessage = execSync("git log -1 --pretty=%B").toString().trim();

  return {
    define: {
      "process.env.GIT_COMMIT_HASH": JSON.stringify(commitHash),
      "process.env.GIT_COMMIT_MESSAGE": JSON.stringify(commitMessage),
    },
    plugins: [react()],
    server: {
      port: 3000,
    },
    base: "/chess-web-app/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      assetsInlineLimit: 4096,
    },
  };
});
