import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import fs from "fs";
import { terser } from "rollup-plugin-terser";
import nodePolyfills from "rollup-plugin-polyfill-node";
import organizeImportsPlugin from "./babel-plugin-organize-imports.js";

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

// Shared plugin configuration
const sharedPlugins = [
  nodeResolve({
    extensions,
    preferBuiltins: false,
    browser: true
  }),
  commonjs({
    include: /node_modules/,
    extensions,
  }),
  typescript({
    tsconfig: "./tsconfig.json",
    declaration: true,
    declarationDir: "./typings"
  }),
  babel({
    extensions,
    babelHelpers: "bundled",
    exclude: /node_modules/,
    presets: [
      ["@babel/preset-env", {
        targets: {
          node: "14"
        }
      }],
      "@babel/preset-typescript",
    ],
    plugins: [
      organizeImportsPlugin
    ]
  }),
  json(),
  nodePolyfills(),
];

export default [
  // ESM build
  {
    input: "src/index.ts",
    output: {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
      exports: "named"
    },
    external: makeExternalPredicate(external),
    plugins: sharedPlugins,
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false
    }
  },
  // CJS build
  {
    input: "src/index.ts",
    output: {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
      exports: "named"
    },
    external: makeExternalPredicate(external),
    plugins: sharedPlugins,
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false
    }
  },
  // Minified build
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.min.js",
      format: "cjs",
      sourcemap: true,
      exports: "named"
    },
    external: makeExternalPredicate(external),
    plugins: [
      ...sharedPlugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      })
    ],
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false
    }
  }
];
