// vite.config.ts
import { defineConfig } from "file:///C:/Users/Patrick/Downloads/My%20App/betaskills2026/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Patrick/Downloads/My%20App/betaskills2026/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/Patrick/Downloads/My%20App/betaskills2026/node_modules/lovable-tagger/dist/index.js";

// package.json
var package_default = {
  name: "vite_react_shadcn_ts",
  private: true,
  version: "0.0.0",
  type: "module",
  engines: {
    node: ">=18.0.0"
  },
  scripts: {
    dev: "vite",
    build: "tsc && vite build --mode production",
    "build:dev": "vite build --mode development",
    "build:analyze": "npm run build && npm run analyze:bundle",
    "analyze:bundle": "npx vite-bundle-analyzer dist/assets/*.js",
    "analyze:size": "npm run build && node scripts/bundle-analyzer.js",
    lint: "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    preview: "vite preview",
    test: "vitest",
    "test:run": "vitest run",
    "test:ui": "vitest --ui",
    "test:production-flows": "vitest run --config vitest.config.production-flows.ts",
    "test:production-flows:ui": "vitest --ui --config vitest.config.production-flows.ts",
    "test:production-flows:coverage": "vitest run --config vitest.config.production-flows.ts --coverage",
    "test:production-flows:runner": "tsx src/test/production-flows-test-runner.ts",
    "test:migration": "vitest run --config vitest.config.migration.ts",
    "test:migration:ui": "vitest --ui --config vitest.config.migration.ts",
    "test:migration:coverage": "vitest run --config vitest.config.migration.ts --coverage",
    "populate-db": "node scripts/populate-database.js",
    "validate:production": "VITE_RUN_VALIDATION=true vite build --mode production --config vite.config.validation.ts",
    "config:check": `node -e "console.log('Environment:', process.env.NODE_ENV || 'development'); console.log('Ikhokha API URL:', process.env.VITE_IKHOKHA_API_URL); console.log('Test Mode:', process.env.VITE_IKHOKHA_TEST_MODE);"`,
    "webhook:setup": "tsx src/scripts/setupProductionWebhooks.ts setup",
    "webhook:validate": "tsx src/scripts/setupProductionWebhooks.ts validate",
    "webhook:test": "tsx src/scripts/setupProductionWebhooks.ts test",
    "webhook:list": "tsx src/scripts/setupProductionWebhooks.ts list",
    "webhook:validate-setup": "tsx src/scripts/validateWebhookSetup.ts",
    "test:card-payment": "node scripts/run-card-payment-tests.js",
    "test:card-payment:comprehensive": "vitest run src/test/card-payment-comprehensive.test.ts --config vitest.config.card-payment.ts",
    "test:card-payment:e2e": "vitest run src/test/e2e/card-payment-flow.e2e.test.ts --config vitest.config.card-payment.ts",
    "test:card-payment:webhook": "vitest run src/test/webhook/webhook-simulation.test.ts --config vitest.config.card-payment.ts",
    "test:card-payment:realtime": "vitest run src/test/realtime/multi-tab-sync.test.ts --config vitest.config.card-payment.ts",
    "test:card-payment:performance": "vitest run src/test/performance/high-volume-processing.test.ts --config vitest.config.card-payment.ts",
    "test:card-payment:coverage": "vitest run --config vitest.config.card-payment.ts --coverage",
    "verify:deployment": "node scripts/verify-deployment.js",
    "test:deployment": "vitest run src/test/deployment/card-payment-deployment-verification.test.ts",
    push: 'git add . && git commit -m "Updated enrollment system with email confirmation and instructor approval flow" && git push origin main'
  },
  dependencies: {
    "@hookform/resolvers": "^3.9.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-alert-dialog": "^1.1.1",
    "@radix-ui/react-aspect-ratio": "^1.1.0",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-collapsible": "^1.1.0",
    "@radix-ui/react-context-menu": "^2.2.1",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-hover-card": "^1.1.1",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-menubar": "^1.1.1",
    "@radix-ui/react-navigation-menu": "^1.2.0",
    "@radix-ui/react-popover": "^1.1.1",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-radio-group": "^1.2.0",
    "@radix-ui/react-scroll-area": "^1.1.0",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slider": "^1.2.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-switch": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-toast": "^1.2.1",
    "@radix-ui/react-toggle": "^1.1.0",
    "@radix-ui/react-toggle-group": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.4",
    "@supabase/supabase-js": "^2.49.8",
    "@tanstack/react-query": "^5.56.2",
    "@types/react-window": "^1.8.8",
    "@types/uuid": "^10.0.0",
    "class-variance-authority": "^0.7.1",
    clsx: "^2.1.1",
    cmdk: "^1.0.0",
    "date-fns": "^3.6.0",
    dotenv: "^17.2.1",
    "embla-carousel-react": "^8.3.0",
    esbuild: "^0.25.8",
    "framer-motion": "^11.18.2",
    "input-otp": "^1.2.4",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.3.0",
    react: "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.0",
    "react-markdown": "^10.1.0",
    "react-resizable-panels": "^2.1.3",
    "react-router-dom": "^6.26.2",
    "react-window": "^2.1.0",
    recharts: "^2.12.7",
    "rehype-raw": "^7.0.0",
    "remark-gfm": "^4.0.1",
    sonner: "^1.5.0",
    "tailwind-merge": "^2.5.2",
    "tailwindcss-animate": "^1.0.7",
    uuid: "^11.1.0",
    vaul: "^0.9.3",
    zod: "^3.23.8"
  },
  devDependencies: {
    "@eslint/js": "^9.9.0",
    "@tailwindcss/typography": "^0.5.15",
    "@testing-library/jest-dom": "^6.8.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@types/node": "^22.5.5",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react-swc": "^3.11.0",
    "@vitest/ui": "^3.2.4",
    autoprefixer: "^10.4.20",
    eslint: "^9.9.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "fast-check": "^4.3.0",
    globals: "^15.9.0",
    jsdom: "^27.0.0",
    "lovable-tagger": "^1.1.7",
    postcss: "^8.4.47",
    tailwindcss: "^3.4.11",
    typescript: "^5.9.3",
    "typescript-eslint": "^8.0.1",
    vite: "^5.4.21",
    "vite-bundle-analyzer": "^0.7.0",
    vitest: "^3.2.4"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "C:\\Users\\Patrick\\Downloads\\My App\\betaskills2026";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "localhost",
    port: 3e3,
    strictPort: false,
    open: true
  },
  plugins: [
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  define: {
    global: "globalThis"
  },
  build: {
    rollupOptions: {
      output: {
        // Minimal chunking to prevent React issues
        manualChunks: {
          // Keep React and all related dependencies in one chunk
          "vendor-react": ["react", "react-dom", "react-router-dom", "react/jsx-runtime"],
          "vendor-supabase": ["@supabase/supabase-js"],
          "vendor-ui": Object.keys(package_default.dependencies).filter((dep) => dep.startsWith("@radix-ui"))
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]"
      }
    },
    sourcemap: mode === "development",
    chunkSizeWarningLimit: 2e3,
    minify: mode === "production" ? "esbuild" : false,
    target: "es2020",
    // More modern target for better compatibility
    // Enable tree shaking
    treeshake: true
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "react-router-dom",
      "@supabase/supabase-js"
    ],
    force: true
    // Force re-optimization
  },
  esbuild: {
    // Remove console statements and debugger in production
    ...mode === "production" && {
      drop: ["console", "debugger"]
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcUGF0cmlja1xcXFxEb3dubG9hZHNcXFxcTXkgQXBwXFxcXGJldGFza2lsbHMyMDI2XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxQYXRyaWNrXFxcXERvd25sb2Fkc1xcXFxNeSBBcHBcXFxcYmV0YXNraWxsczIwMjZcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1BhdHJpY2svRG93bmxvYWRzL015JTIwQXBwL2JldGFza2lsbHMyMDI2L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XHJcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiBcImxvY2FsaG9zdFwiLFxyXG4gICAgcG9ydDogMzAwMCxcclxuICAgIHN0cmljdFBvcnQ6IGZhbHNlLFxyXG4gICAgb3BlbjogdHJ1ZSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBtb2RlID09PSAnZGV2ZWxvcG1lbnQnICYmIGNvbXBvbmVudFRhZ2dlcigpLFxyXG4gIF0uZmlsdGVyKEJvb2xlYW4pLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGRlZmluZToge1xyXG4gICAgZ2xvYmFsOiAnZ2xvYmFsVGhpcycsXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAvLyBNaW5pbWFsIGNodW5raW5nIHRvIHByZXZlbnQgUmVhY3QgaXNzdWVzXHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAgICAgICAvLyBLZWVwIFJlYWN0IGFuZCBhbGwgcmVsYXRlZCBkZXBlbmRlbmNpZXMgaW4gb25lIGNodW5rXHJcbiAgICAgICAgICAndmVuZG9yLXJlYWN0JzogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbScsICdyZWFjdC9qc3gtcnVudGltZSddLFxyXG4gICAgICAgICAgJ3ZlbmRvci1zdXBhYmFzZSc6IFsnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJ10sXHJcbiAgICAgICAgICAndmVuZG9yLXVpJzogT2JqZWN0LmtleXMocGFja2FnZUpzb24uZGVwZW5kZW5jaWVzKS5maWx0ZXIoZGVwID0+IGRlcC5zdGFydHNXaXRoKCdAcmFkaXgtdWknKSksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLltleHRdJ1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNvdXJjZW1hcDogbW9kZSA9PT0gJ2RldmVsb3BtZW50JyxcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMjAwMCxcclxuICAgIG1pbmlmeTogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nID8gJ2VzYnVpbGQnIDogZmFsc2UsXHJcbiAgICB0YXJnZXQ6ICdlczIwMjAnLCAvLyBNb3JlIG1vZGVybiB0YXJnZXQgZm9yIGJldHRlciBjb21wYXRpYmlsaXR5XHJcbiAgICAvLyBFbmFibGUgdHJlZSBzaGFraW5nXHJcbiAgICB0cmVlc2hha2U6IHRydWUsXHJcbiAgfSxcclxuICBvcHRpbWl6ZURlcHM6IHtcclxuICAgIGluY2x1ZGU6IFtcclxuICAgICAgJ3JlYWN0JywgXHJcbiAgICAgICdyZWFjdC1kb20nLCBcclxuICAgICAgJ3JlYWN0L2pzeC1ydW50aW1lJyxcclxuICAgICAgJ3JlYWN0L2pzeC1kZXYtcnVudGltZScsXHJcbiAgICAgICdyZWFjdC1yb3V0ZXItZG9tJyxcclxuICAgICAgJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcydcclxuICAgIF0sXHJcbiAgICBmb3JjZTogdHJ1ZSwgLy8gRm9yY2UgcmUtb3B0aW1pemF0aW9uXHJcbiAgfSxcclxuICBlc2J1aWxkOiB7XHJcbiAgICAvLyBSZW1vdmUgY29uc29sZSBzdGF0ZW1lbnRzIGFuZCBkZWJ1Z2dlciBpbiBwcm9kdWN0aW9uXHJcbiAgICAuLi4obW9kZSA9PT0gJ3Byb2R1Y3Rpb24nICYmIHtcclxuICAgICAgZHJvcDogWydjb25zb2xlJywgJ2RlYnVnZ2VyJ10sXHJcbiAgICB9KSxcclxuICB9LFxyXG59KSk7XHJcbiIsICJ7XHJcbiAgXCJuYW1lXCI6IFwidml0ZV9yZWFjdF9zaGFkY25fdHNcIixcclxuICBcInByaXZhdGVcIjogdHJ1ZSxcclxuICBcInZlcnNpb25cIjogXCIwLjAuMFwiLFxyXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gIFwiZW5naW5lc1wiOiB7XHJcbiAgICBcIm5vZGVcIjogXCI+PTE4LjAuMFwiXHJcbiAgfSxcclxuICBcInNjcmlwdHNcIjoge1xyXG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXHJcbiAgICBcImJ1aWxkXCI6IFwidHNjICYmIHZpdGUgYnVpbGQgLS1tb2RlIHByb2R1Y3Rpb25cIixcclxuICAgIFwiYnVpbGQ6ZGV2XCI6IFwidml0ZSBidWlsZCAtLW1vZGUgZGV2ZWxvcG1lbnRcIixcclxuICAgIFwiYnVpbGQ6YW5hbHl6ZVwiOiBcIm5wbSBydW4gYnVpbGQgJiYgbnBtIHJ1biBhbmFseXplOmJ1bmRsZVwiLFxyXG4gICAgXCJhbmFseXplOmJ1bmRsZVwiOiBcIm5weCB2aXRlLWJ1bmRsZS1hbmFseXplciBkaXN0L2Fzc2V0cy8qLmpzXCIsXHJcbiAgICBcImFuYWx5emU6c2l6ZVwiOiBcIm5wbSBydW4gYnVpbGQgJiYgbm9kZSBzY3JpcHRzL2J1bmRsZS1hbmFseXplci5qc1wiLFxyXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC4gLS1leHQgdHMsdHN4IC0tcmVwb3J0LXVudXNlZC1kaXNhYmxlLWRpcmVjdGl2ZXMgLS1tYXgtd2FybmluZ3MgMFwiLFxyXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXHJcbiAgICBcInRlc3RcIjogXCJ2aXRlc3RcIixcclxuICAgIFwidGVzdDpydW5cIjogXCJ2aXRlc3QgcnVuXCIsXHJcbiAgICBcInRlc3Q6dWlcIjogXCJ2aXRlc3QgLS11aVwiLFxyXG4gICAgXCJ0ZXN0OnByb2R1Y3Rpb24tZmxvd3NcIjogXCJ2aXRlc3QgcnVuIC0tY29uZmlnIHZpdGVzdC5jb25maWcucHJvZHVjdGlvbi1mbG93cy50c1wiLFxyXG4gICAgXCJ0ZXN0OnByb2R1Y3Rpb24tZmxvd3M6dWlcIjogXCJ2aXRlc3QgLS11aSAtLWNvbmZpZyB2aXRlc3QuY29uZmlnLnByb2R1Y3Rpb24tZmxvd3MudHNcIixcclxuICAgIFwidGVzdDpwcm9kdWN0aW9uLWZsb3dzOmNvdmVyYWdlXCI6IFwidml0ZXN0IHJ1biAtLWNvbmZpZyB2aXRlc3QuY29uZmlnLnByb2R1Y3Rpb24tZmxvd3MudHMgLS1jb3ZlcmFnZVwiLFxyXG4gICAgXCJ0ZXN0OnByb2R1Y3Rpb24tZmxvd3M6cnVubmVyXCI6IFwidHN4IHNyYy90ZXN0L3Byb2R1Y3Rpb24tZmxvd3MtdGVzdC1ydW5uZXIudHNcIixcclxuICAgIFwidGVzdDptaWdyYXRpb25cIjogXCJ2aXRlc3QgcnVuIC0tY29uZmlnIHZpdGVzdC5jb25maWcubWlncmF0aW9uLnRzXCIsXHJcbiAgICBcInRlc3Q6bWlncmF0aW9uOnVpXCI6IFwidml0ZXN0IC0tdWkgLS1jb25maWcgdml0ZXN0LmNvbmZpZy5taWdyYXRpb24udHNcIixcclxuICAgIFwidGVzdDptaWdyYXRpb246Y292ZXJhZ2VcIjogXCJ2aXRlc3QgcnVuIC0tY29uZmlnIHZpdGVzdC5jb25maWcubWlncmF0aW9uLnRzIC0tY292ZXJhZ2VcIixcclxuICAgIFwicG9wdWxhdGUtZGJcIjogXCJub2RlIHNjcmlwdHMvcG9wdWxhdGUtZGF0YWJhc2UuanNcIixcclxuICAgIFwidmFsaWRhdGU6cHJvZHVjdGlvblwiOiBcIlZJVEVfUlVOX1ZBTElEQVRJT049dHJ1ZSB2aXRlIGJ1aWxkIC0tbW9kZSBwcm9kdWN0aW9uIC0tY29uZmlnIHZpdGUuY29uZmlnLnZhbGlkYXRpb24udHNcIixcclxuICAgIFwiY29uZmlnOmNoZWNrXCI6IFwibm9kZSAtZSBcXFwiY29uc29sZS5sb2coJ0Vudmlyb25tZW50OicsIHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdkZXZlbG9wbWVudCcpOyBjb25zb2xlLmxvZygnSWtob2toYSBBUEkgVVJMOicsIHByb2Nlc3MuZW52LlZJVEVfSUtIT0tIQV9BUElfVVJMKTsgY29uc29sZS5sb2coJ1Rlc3QgTW9kZTonLCBwcm9jZXNzLmVudi5WSVRFX0lLSE9LSEFfVEVTVF9NT0RFKTtcXFwiXCIsXHJcbiAgICBcIndlYmhvb2s6c2V0dXBcIjogXCJ0c3ggc3JjL3NjcmlwdHMvc2V0dXBQcm9kdWN0aW9uV2ViaG9va3MudHMgc2V0dXBcIixcclxuICAgIFwid2ViaG9vazp2YWxpZGF0ZVwiOiBcInRzeCBzcmMvc2NyaXB0cy9zZXR1cFByb2R1Y3Rpb25XZWJob29rcy50cyB2YWxpZGF0ZVwiLFxyXG4gICAgXCJ3ZWJob29rOnRlc3RcIjogXCJ0c3ggc3JjL3NjcmlwdHMvc2V0dXBQcm9kdWN0aW9uV2ViaG9va3MudHMgdGVzdFwiLFxyXG4gICAgXCJ3ZWJob29rOmxpc3RcIjogXCJ0c3ggc3JjL3NjcmlwdHMvc2V0dXBQcm9kdWN0aW9uV2ViaG9va3MudHMgbGlzdFwiLFxyXG4gICAgXCJ3ZWJob29rOnZhbGlkYXRlLXNldHVwXCI6IFwidHN4IHNyYy9zY3JpcHRzL3ZhbGlkYXRlV2ViaG9va1NldHVwLnRzXCIsXHJcbiAgICBcInRlc3Q6Y2FyZC1wYXltZW50XCI6IFwibm9kZSBzY3JpcHRzL3J1bi1jYXJkLXBheW1lbnQtdGVzdHMuanNcIixcclxuICAgIFwidGVzdDpjYXJkLXBheW1lbnQ6Y29tcHJlaGVuc2l2ZVwiOiBcInZpdGVzdCBydW4gc3JjL3Rlc3QvY2FyZC1wYXltZW50LWNvbXByZWhlbnNpdmUudGVzdC50cyAtLWNvbmZpZyB2aXRlc3QuY29uZmlnLmNhcmQtcGF5bWVudC50c1wiLFxyXG4gICAgXCJ0ZXN0OmNhcmQtcGF5bWVudDplMmVcIjogXCJ2aXRlc3QgcnVuIHNyYy90ZXN0L2UyZS9jYXJkLXBheW1lbnQtZmxvdy5lMmUudGVzdC50cyAtLWNvbmZpZyB2aXRlc3QuY29uZmlnLmNhcmQtcGF5bWVudC50c1wiLFxyXG4gICAgXCJ0ZXN0OmNhcmQtcGF5bWVudDp3ZWJob29rXCI6IFwidml0ZXN0IHJ1biBzcmMvdGVzdC93ZWJob29rL3dlYmhvb2stc2ltdWxhdGlvbi50ZXN0LnRzIC0tY29uZmlnIHZpdGVzdC5jb25maWcuY2FyZC1wYXltZW50LnRzXCIsXHJcbiAgICBcInRlc3Q6Y2FyZC1wYXltZW50OnJlYWx0aW1lXCI6IFwidml0ZXN0IHJ1biBzcmMvdGVzdC9yZWFsdGltZS9tdWx0aS10YWItc3luYy50ZXN0LnRzIC0tY29uZmlnIHZpdGVzdC5jb25maWcuY2FyZC1wYXltZW50LnRzXCIsXHJcbiAgICBcInRlc3Q6Y2FyZC1wYXltZW50OnBlcmZvcm1hbmNlXCI6IFwidml0ZXN0IHJ1biBzcmMvdGVzdC9wZXJmb3JtYW5jZS9oaWdoLXZvbHVtZS1wcm9jZXNzaW5nLnRlc3QudHMgLS1jb25maWcgdml0ZXN0LmNvbmZpZy5jYXJkLXBheW1lbnQudHNcIixcclxuICAgIFwidGVzdDpjYXJkLXBheW1lbnQ6Y292ZXJhZ2VcIjogXCJ2aXRlc3QgcnVuIC0tY29uZmlnIHZpdGVzdC5jb25maWcuY2FyZC1wYXltZW50LnRzIC0tY292ZXJhZ2VcIixcclxuICAgIFwidmVyaWZ5OmRlcGxveW1lbnRcIjogXCJub2RlIHNjcmlwdHMvdmVyaWZ5LWRlcGxveW1lbnQuanNcIixcclxuICAgIFwidGVzdDpkZXBsb3ltZW50XCI6IFwidml0ZXN0IHJ1biBzcmMvdGVzdC9kZXBsb3ltZW50L2NhcmQtcGF5bWVudC1kZXBsb3ltZW50LXZlcmlmaWNhdGlvbi50ZXN0LnRzXCIsXHJcbiAgICBcInB1c2hcIjogXCJnaXQgYWRkIC4gJiYgZ2l0IGNvbW1pdCAtbSBcXFwiVXBkYXRlZCBlbnJvbGxtZW50IHN5c3RlbSB3aXRoIGVtYWlsIGNvbmZpcm1hdGlvbiBhbmQgaW5zdHJ1Y3RvciBhcHByb3ZhbCBmbG93XFxcIiAmJiBnaXQgcHVzaCBvcmlnaW4gbWFpblwiXHJcbiAgfSxcclxuICBcImRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcIkBob29rZm9ybS9yZXNvbHZlcnNcIjogXCJeMy45LjBcIixcclxuICAgIFwiQHJhZGl4LXVpL3JlYWN0LWFjY29yZGlvblwiOiBcIl4xLjIuMFwiLFxyXG4gICAgXCJAcmFkaXgtdWkvcmVhY3QtYWxlcnQtZGlhbG9nXCI6IFwiXjEuMS4xXCIsXHJcbiAgICBcIkByYWRpeC11aS9yZWFjdC1hc3BlY3QtcmF0aW9cIjogXCJeMS4xLjBcIixcclxuICAgIFwiQHJhZGl4LXVpL3JlYWN0LWF2YXRhclwiOiBcIl4xLjEuMFwiLFxyXG4gICAgXCJAcmFkaXgtdWkvcmVhY3QtY2hlY2tib3hcIjogXCJeMS4xLjFcIixcclxuICAgIFwiQHJhZGl4LXVpL3JlYWN0LWNvbGxhcHNpYmxlXCI6IFwiXjEuMS4wXCIsXHJcbiAgICBcIkByYWRpeC11aS9yZWFjdC1jb250ZXh0LW1lbnVcIjogXCJeMi4yLjFcIixcclxuICAgIFwiQHJhZGl4LXVpL3JlYWN0LWRpYWxvZ1wiOiBcIl4xLjEuMlwiLFxyXG4gICAgXCJAcmFkaXgtdWkvcmVhY3QtZHJvcGRvd24tbWVudVwiOiBcIl4yLjEuMVwiLFxyXG4gICAgXCJAcmFkaXgtdWkvcmVhY3QtaG92ZXItY2FyZFwiOiBcIl4xLjEuMVwiLFxyXG4gICAgXCJAcmFkaXgtdWkvcmVhY3QtbGFiZWxcIjogXCJeMi4xLjBcIixcclxuICAgIFwiQHJhZGl4LXVpL3JlYWN0LW1lbnViYXJcIjogXCJeMS4xLjFcIixcclxuICAgIFwiQHJhZGl4LXVpL3JlYWN0LW5hdmlnYXRpb24tbWVudVwiOiBcIl4xLjIuMFwiLFxyXG4gICAgXCJAcmFkaXgtdWkvcmVhY3QtcG9wb3ZlclwiOiBcIl4xLjEuMVwiLFxyXG4gICAgXCJAcmFkaXgtdWkvcmVhY3QtcHJvZ3Jlc3NcIjogXCJeMS4xLjBcIixcclxuICAgIFwiQHJhZGl4LXVpL3JlYWN0LXJhZGlvLWdyb3VwXCI6IFwiXjEuMi4wXCIsXHJcbiAgICBcIkByYWRpeC11aS9yZWFjdC1zY3JvbGwtYXJlYVwiOiBcIl4xLjEuMFwiLFxyXG4gICAgXCJAcmFkaXgtdWkvcmVhY3Qtc2VsZWN0XCI6IFwiXjIuMS4xXCIsXHJcbiAgICBcIkByYWRpeC11aS9yZWFjdC1zZXBhcmF0b3JcIjogXCJeMS4xLjBcIixcclxuICAgIFwiQHJhZGl4LXVpL3JlYWN0LXNsaWRlclwiOiBcIl4xLjIuMFwiLFxyXG4gICAgXCJAcmFkaXgtdWkvcmVhY3Qtc2xvdFwiOiBcIl4xLjEuMFwiLFxyXG4gICAgXCJAcmFkaXgtdWkvcmVhY3Qtc3dpdGNoXCI6IFwiXjEuMS4wXCIsXHJcbiAgICBcIkByYWRpeC11aS9yZWFjdC10YWJzXCI6IFwiXjEuMS4wXCIsXHJcbiAgICBcIkByYWRpeC11aS9yZWFjdC10b2FzdFwiOiBcIl4xLjIuMVwiLFxyXG4gICAgXCJAcmFkaXgtdWkvcmVhY3QtdG9nZ2xlXCI6IFwiXjEuMS4wXCIsXHJcbiAgICBcIkByYWRpeC11aS9yZWFjdC10b2dnbGUtZ3JvdXBcIjogXCJeMS4xLjBcIixcclxuICAgIFwiQHJhZGl4LXVpL3JlYWN0LXRvb2x0aXBcIjogXCJeMS4xLjRcIixcclxuICAgIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCI6IFwiXjIuNDkuOFwiLFxyXG4gICAgXCJAdGFuc3RhY2svcmVhY3QtcXVlcnlcIjogXCJeNS41Ni4yXCIsXHJcbiAgICBcIkB0eXBlcy9yZWFjdC13aW5kb3dcIjogXCJeMS44LjhcIixcclxuICAgIFwiQHR5cGVzL3V1aWRcIjogXCJeMTAuMC4wXCIsXHJcbiAgICBcImNsYXNzLXZhcmlhbmNlLWF1dGhvcml0eVwiOiBcIl4wLjcuMVwiLFxyXG4gICAgXCJjbHN4XCI6IFwiXjIuMS4xXCIsXHJcbiAgICBcImNtZGtcIjogXCJeMS4wLjBcIixcclxuICAgIFwiZGF0ZS1mbnNcIjogXCJeMy42LjBcIixcclxuICAgIFwiZG90ZW52XCI6IFwiXjE3LjIuMVwiLFxyXG4gICAgXCJlbWJsYS1jYXJvdXNlbC1yZWFjdFwiOiBcIl44LjMuMFwiLFxyXG4gICAgXCJlc2J1aWxkXCI6IFwiXjAuMjUuOFwiLFxyXG4gICAgXCJmcmFtZXItbW90aW9uXCI6IFwiXjExLjE4LjJcIixcclxuICAgIFwiaW5wdXQtb3RwXCI6IFwiXjEuMi40XCIsXHJcbiAgICBcImx1Y2lkZS1yZWFjdFwiOiBcIl4wLjQ2Mi4wXCIsXHJcbiAgICBcIm5leHQtdGhlbWVzXCI6IFwiXjAuMy4wXCIsXHJcbiAgICBcInJlYWN0XCI6IFwiXjE4LjMuMVwiLFxyXG4gICAgXCJyZWFjdC1kYXktcGlja2VyXCI6IFwiXjguMTAuMVwiLFxyXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMy4xXCIsXHJcbiAgICBcInJlYWN0LWhvb2stZm9ybVwiOiBcIl43LjUzLjBcIixcclxuICAgIFwicmVhY3QtbWFya2Rvd25cIjogXCJeMTAuMS4wXCIsXHJcbiAgICBcInJlYWN0LXJlc2l6YWJsZS1wYW5lbHNcIjogXCJeMi4xLjNcIixcclxuICAgIFwicmVhY3Qtcm91dGVyLWRvbVwiOiBcIl42LjI2LjJcIixcclxuICAgIFwicmVhY3Qtd2luZG93XCI6IFwiXjIuMS4wXCIsXHJcbiAgICBcInJlY2hhcnRzXCI6IFwiXjIuMTIuN1wiLFxyXG4gICAgXCJyZWh5cGUtcmF3XCI6IFwiXjcuMC4wXCIsXHJcbiAgICBcInJlbWFyay1nZm1cIjogXCJeNC4wLjFcIixcclxuICAgIFwic29ubmVyXCI6IFwiXjEuNS4wXCIsXHJcbiAgICBcInRhaWx3aW5kLW1lcmdlXCI6IFwiXjIuNS4yXCIsXHJcbiAgICBcInRhaWx3aW5kY3NzLWFuaW1hdGVcIjogXCJeMS4wLjdcIixcclxuICAgIFwidXVpZFwiOiBcIl4xMS4xLjBcIixcclxuICAgIFwidmF1bFwiOiBcIl4wLjkuM1wiLFxyXG4gICAgXCJ6b2RcIjogXCJeMy4yMy44XCJcclxuICB9LFxyXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQGVzbGludC9qc1wiOiBcIl45LjkuMFwiLFxyXG4gICAgXCJAdGFpbHdpbmRjc3MvdHlwb2dyYXBoeVwiOiBcIl4wLjUuMTVcIixcclxuICAgIFwiQHRlc3RpbmctbGlicmFyeS9qZXN0LWRvbVwiOiBcIl42LjguMFwiLFxyXG4gICAgXCJAdGVzdGluZy1saWJyYXJ5L3JlYWN0XCI6IFwiXjE2LjMuMFwiLFxyXG4gICAgXCJAdGVzdGluZy1saWJyYXJ5L3VzZXItZXZlbnRcIjogXCJeMTQuNi4xXCIsXHJcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIyLjUuNVwiLFxyXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMy4zXCIsXHJcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMy4wXCIsXHJcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiOiBcIl4zLjExLjBcIixcclxuICAgIFwiQHZpdGVzdC91aVwiOiBcIl4zLjIuNFwiLFxyXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4yMFwiLFxyXG4gICAgXCJlc2xpbnRcIjogXCJeOS45LjBcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1ob29rc1wiOiBcIl41LjEuMC1yYy4wXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtcmVmcmVzaFwiOiBcIl4wLjQuOVwiLFxyXG4gICAgXCJmYXN0LWNoZWNrXCI6IFwiXjQuMy4wXCIsXHJcbiAgICBcImdsb2JhbHNcIjogXCJeMTUuOS4wXCIsXHJcbiAgICBcImpzZG9tXCI6IFwiXjI3LjAuMFwiLFxyXG4gICAgXCJsb3ZhYmxlLXRhZ2dlclwiOiBcIl4xLjEuN1wiLFxyXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC40N1wiLFxyXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjQuMTFcIixcclxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjkuM1wiLFxyXG4gICAgXCJ0eXBlc2NyaXB0LWVzbGludFwiOiBcIl44LjAuMVwiLFxyXG4gICAgXCJ2aXRlXCI6IFwiXjUuNC4yMVwiLFxyXG4gICAgXCJ2aXRlLWJ1bmRsZS1hbmFseXplclwiOiBcIl4wLjcuMFwiLFxyXG4gICAgXCJ2aXRlc3RcIjogXCJeMy4yLjRcIlxyXG4gIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdWLFNBQVMsb0JBQW9CO0FBQzdXLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7OztBQ0hoQztBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsU0FBVztBQUFBLEVBQ1gsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLElBQ1QsTUFBUTtBQUFBLEVBQ1Y7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
