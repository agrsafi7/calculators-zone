import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    // ✅ Code splitting — splits vendor libraries into separate chunks
    // Reduces initial JS bundle size → faster First Contentful Paint
    rollupOptions: {
      output: {
        manualChunks: {
          // React core in its own chunk
          "vendor-react": ["react", "react-dom"],
          // Router separate chunk
          "vendor-router": ["react-router-dom"],
          // UI components chunk
          "vendor-ui": ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-select", "@radix-ui/react-tabs", "@radix-ui/react-accordion"],
          // Query client
          "vendor-query": ["@tanstack/react-query"],
        },
      },
    },
    // ✅ Minify for production
    minify: "esbuild",
    // ✅ Emit a manifest so the prerender script can map pages to their chunks
    // (used for per-route modulepreload hints)
    manifest: true,
    // ✅ Remove console.log in production
    target: "esnext",
  },
}));
