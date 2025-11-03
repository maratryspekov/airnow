import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/postcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    proxy: {
      "/api/openaq": {
        target: "https://api.openaq.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/openaq/, ""),
      },
    },
  },
});
