import { build, BuildOptions } from "esbuild";

const args = process.argv.slice(2);
const prodOptions: BuildOptions = args.includes("prod")
  ? {
      minify: true,
    }
  : {
      sourcemap: true,
    };
const shouldWatch = args.includes("watch");
const watchOptions: BuildOptions = shouldWatch
  ? {
      watch: true,
    }
  : {};

(async () => {
  await build({
    entryPoints: ["src/client/index.ts"],
    bundle: true,
    outfile: "public/index.js",
    format: "esm",
    ...prodOptions,
    ...watchOptions,
  });

  shouldWatch || process.exit(0);
})();
