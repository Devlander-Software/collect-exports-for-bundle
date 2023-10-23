import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';
import auto from 'rollup-plugin-auto-external';
import dts from 'rollup-plugin-dts';
import nodePolyfills from 'rollup-plugin-polyfill-node'; // import the plugin

const pkg = JSON.parse(readFileSync('package.json', { encoding: 'utf8' }));

const globals = {
  envGenerator: "envGenerator",
  'fs': 'fs',
  'path': 'path',
  'picocolors': 'pc'
}

const commonOutput = {
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false,
  },
  plugins: [
    commonjs({ ignoreTryCatch: false, include: 'node_modules/**' }),
    typescript({ tsconfig: './tsconfig.json', sourceMap: true, inlineSources: true }),
    auto(),
    nodePolyfills({
      fs: true, // add the polyfills for fs
      path: true, // add the polyfills for pat
    }), // add the polyfill plugin
  ],
};

const config = [
  {
    input: './index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        globals // add globals
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
        globals // add globals
      },
    ],
    ...commonOutput,
  },

  {
    input: 'dist/typings/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];

export default config;
