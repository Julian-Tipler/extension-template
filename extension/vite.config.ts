import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    define: {
      // Make env variables available to client-side code
      "process.env.VITE_PUBLIC_SUPABASE_URL": JSON.stringify(
        env.VITE_PUBLIC_SUPABASE_URL
      ),
      "process.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY": JSON.stringify(
        env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY
      ),
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        input: {
          popup: "index.html", // The entry point for the React app
          content: "content/content.js", // The entry point for the content script
          background: "background/background.js", // The entry point for the background script
        },
        output: {
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === "content") {
              return "content/content.js";
            }
            if (chunkInfo.name === "background") {
              return "background/background.js";
            }
            // For all other entries, retain the default behavior which includes hashing and assets folder
            return "assets/[name]-[hash].js";
          },
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            // Check if the asset is a CSS file and if it is being imported by 'content'
            if (
              assetInfo.name.includes("content") &&
              assetInfo.name.endsWith(".css")
            ) {
              return "content/content.css";
            } else if (assetInfo.name.includes(".png")) {
              return "assets/[name][extname]";
            }
            // Default asset file name pattern
            return "assets/[name]-[hash][extname]";
          },
        },
      },
    },
  };
});
