import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist/", // Output directory for build
    emptyOutDir: true, // Clear old build files
  },
  server: {
    port: 3001, // Dev server port (different from backend)
    proxy: {
      "/api": "http://localhost:3000", // Proxy API requests to the backend
    },
  },
  resolve: {
	alias: {
	  "@": "/src", // Alias @ to /src
	},
  },
});
