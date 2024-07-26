import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import fs from "fs";
import { terser } from "rollup-plugin-terser";
import nodePolyfills from "rollup-plugin-polyfill-node";

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

const extensions = [".js", ".jsx", ".ts", ".tsx", ".web.js", ".native.js"];

// Exclude certain dependencies from being bundled
const external = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
  "fs",
  "path",
  "fs/promises",
  "picocolors"
];

const globals = {
  "picocolors": "picocolors",
  "fs": "fs",
  "path": "path",
  "fs/promises": "fs$1"
};

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join("|")})($|/)`);
  return id => pattern.test(id);
};

export default {
  input: "src/index.ts", // Your entry point
  output: [
 
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
      exports: "named"
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
      exports: "named"
    }
  ],
  external: makeExternalPredicate(external),
  plugins: [
    nodeResolve({
      extensions,
      preferBuiltins: false,
      browser: true
    }),
    commonjs({
      include: /node_modules/,
      extensions,
    }),
    babel({
      extensions,
      babelHelpers: "bundled",
      exclude: /node_modules/,
      presets: [
        "@babel/preset-env",
        "@babel/preset-typescript",
      ],
    }),
    typescript(),
    json(),
    nodePolyfills(),
    terser(), // Use terser for minification
  ],
};
