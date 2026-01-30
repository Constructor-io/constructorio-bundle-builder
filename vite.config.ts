import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { resolve } from "path";

const bundleConfigs: Record<
  string,
  {
    entry: string;
    name: string;
    fileName: string;
    outDir: string;
    styleId: string;
  }
> = {
  plp: {
    entry: resolve(__dirname, "src/cio-plp/index.tsx"),
    // Expose CioPlp globally in the window object
    name: "CioPlp",
    fileName: "custom-cio-plp",
    outDir: "dist/cio-plp",
    styleId: "cio-plp-styles",
  },
};

const bundleName = process.env.BUNDLE_NAME;

if (!bundleName || !bundleConfigs[bundleName]) {
  throw new Error(
    `Invalid BUNDLE_NAME: "${bundleName}". Valid options: ${Object.keys(bundleConfigs).join(", ")}`,
  );
}

const config = bundleConfigs[bundleName];

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin({
      styleId: config.styleId,
    }), // Injects CSS into the JS bundle
  ],
  resolve: {
    // Ensure all React imports resolve to the same instance
    dedupe: ["react", "react-dom"],
    alias: {
      react: resolve(__dirname, "node_modules/react"),
      "react-dom": resolve(__dirname, "node_modules/react-dom"),
    },
  },
  build: {
    lib: {
      entry: config.entry,
      name: config.name,
      fileName: config.fileName,
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        entryFileNames: `${config.fileName}.js`,
        inlineDynamicImports: true,
      },
    },
    outDir: config.outDir,
    copyPublicDir: false,
    emptyOutDir: true,
    minify: true,
    // To enable sourcemaps, set this to true or 'inline'
    sourcemap: false,
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});
