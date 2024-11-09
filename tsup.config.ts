import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  outDir: "dist",
  target: "es2022",
  format: "esm",
  clean: true,
  dts: true,
  treeshake: true,
  sourcemap: true,
  splitting: true,
  minify: true,
});
