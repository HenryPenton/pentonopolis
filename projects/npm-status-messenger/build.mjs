import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/startup.ts"],
  bundle: true,
  minify: false,
  outdir: "dist",
  platform: "node",
  target: "node22.2",
  external: ["commander",]
});
