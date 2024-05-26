import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  minify: true,
  outdir: "dist",
  platform: "node",
  target: "node22.2"
});
