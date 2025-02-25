import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  css: {
    devSourcemap: true,
  },
  server: {
    proxy: {
      "/api": "https://codelang.vercel.app/",
      "/socket.io": {
        target: "https://codelang.vercel.app",
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
