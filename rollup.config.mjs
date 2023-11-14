import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import fs from "fs";
import { dts } from "rollup-plugin-dts";
import nodePolyfills from "rollup-plugin-polyfill-node";

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
const tsconfigJson = JSON.parse(fs.readFileSync("./tsconfig.json", "utf-8"));

const extensions = [".js", ".jsx", ".ts", ".tsx", ".web.js", ".native.js"];

// Exclude certain dependencies from being bundled
const external = [
  "fs",
  "picocolors"
  // Add more peer dependencies here
];

const treeshake = {
  moduleSideEffects: false,
  propertyReadSideEffects: false,
  tryCatchDeoptimization: false
};

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join("|")})($|/)`);
  return id => pattern.test(id);
};

export default [{
  input: "src/index.ts", // Your entry point
  output: [
    {
      file: packageJson.browser, // UMD build
      format: "umd",
      name: "CollectExportsForBundle", // Replace with your library's name
      sourcemap: true,
    },
    {
      file: packageJson.main, // UMD build
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module, // ESM build
      format: "esm",
      sourcemap: true,
    }
  ],
  external: makeExternalPredicate(external),
  plugins: [
  
    nodeResolve({
      extensions,
      preferBuiltins: true,
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
    typescript({ tsconfig: "./tsconfig.json" }),
    nodePolyfills(),
    json(),
    // terser(), // Use terser for minification
  ],
},
{
  treeshake,

  input: packageJson.types,
  output: [{ file: 'dist/index.d.ts', format: 'esm' }],
  plugins: [dts()],
},

]
  