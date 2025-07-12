import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import fs from "fs";
import { terser } from "rollup-plugin-terser";
import nodePolyfills from "rollup-plugin-polyfill-node";
import { visualizer } from 'rollup-plugin-visualizer';
import { preserveDirectives } from 'rollup-plugin-preserve-directives';
import { swc } from 'rollup-plugin-swc3';

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

const extensions = [".js", ".jsx", ".ts", ".tsx", ".web.js", ".native.js"];

// Optimized externals - only include what's actually needed
const external = [
  "fs",
  "path",
  "fs/promises",
  "picocolors",
  "commander",
  "jest",
  "ts-jest",
  "ts-node",
  "typescript"
];

// Performance-optimized globals
const globals = {
  "picocolors": "picocolors",
  "fs": "fs",
  "path": "path",
  "fs/promises": "fs$1",
  "commander": "commander"
};

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join("|")})($|/)`);
  return id => pattern.test(id);
};

// SWC configuration for faster compilation
const swcConfig = {
  jsc: {
    parser: {
      syntax: "typescript",
      tsx: false,
      decorators: false,
      dynamicImport: false
    },
    target: "es2020",
    transform: {
      legacyDecorator: false,
      decoratorMetadata: false
    },
    keepClassNames: false,
    externalHelpers: false,
    loose: true
  },
  minify: false,
  isModule: true
};

// Optimized shared plugins
const sharedPlugins = [
  // Use SWC for faster TypeScript compilation
  swc({
    ...swcConfig,
    include: /\.ts$/,
    exclude: /node_modules/
  }),
  
  nodeResolve({
    extensions,
    preferBuiltins: true, // Prefer Node.js built-ins
    browser: false, // We're targeting Node.js
    modulesOnly: true // Only resolve modules, not files
  }),
  
  commonjs({
    include: /node_modules/,
    extensions,
    transformMixedEsModules: true,
    ignoreDynamicRequires: true
  }),
  
  json({
    compact: true // Minimize JSON
  }),
  
  nodePolyfills({
    include: ['buffer', 'process', 'util']
  }),
  
  preserveDirectives()
];

// Production plugins
const productionPlugins = [
  ...sharedPlugins,
  terser({
    compress: {
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ['console.log', 'console.info', 'console.debug'],
      passes: 2,
      unsafe: true,
      unsafe_comps: true,
      unsafe_Function: true,
      unsafe_math: true,
      unsafe_proto: true,
      unsafe_regexp: true,
      unsafe_undefined: true
    },
    mangle: {
      safari10: true
    },
    format: {
      comments: false
    }
  })
];

// Bundle analyzer for development
const developmentPlugins = [
  ...sharedPlugins,
  visualizer({
    filename: 'dist/bundle-analysis.html',
    open: false,
    gzipSize: true,
    brotliSize: true
  })
];

export default [
  // Optimized ESM build
  {
    input: "src/index.ts",
    output: {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
      exports: "named",
      compact: true,
      generatedCode: {
        preset: 'es2015',
        constBindings: true
      }
    },
    external: makeExternalPredicate(external),
    plugins: sharedPlugins,
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false,
      tryCatchDeoptimization: false,
      unknownGlobalSideEffects: false
    },
    onwarn(warning, warn) {
      // Suppress certain warnings for cleaner output
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
      warn(warning);
    }
  },
  
  // Optimized CJS build
  {
    input: "src/index.ts",
    output: {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
      exports: "named",
      compact: true,
      generatedCode: {
        preset: 'es2015',
        constBindings: true
      }
    },
    external: makeExternalPredicate(external),
    plugins: sharedPlugins,
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false,
      tryCatchDeoptimization: false
    },
    onwarn(warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
      warn(warning);
    }
  },
  
  // Ultra-optimized minified build
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.min.js",
      format: "cjs",
      sourcemap: false, // Disable sourcemap for minified version
      exports: "named",
      compact: true,
      generatedCode: {
        preset: 'es2015',
        constBindings: true
      }
    },
    external: makeExternalPredicate(external),
    plugins: productionPlugins,
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false,
      tryCatchDeoptimization: false
    },
    onwarn(warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
      warn(warning);
    }
  },
  
  // Development build with analysis
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.dev.js",
      format: "cjs",
      sourcemap: true,
      exports: "named"
    },
    external: makeExternalPredicate(external),
    plugins: developmentPlugins,
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false
    }
  }
]; 