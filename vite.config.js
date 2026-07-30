import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    serverFns: { disableCsrfMiddlewareWarning: true },
  },
  vite: {
    server: { port: 3000 }
  }
});