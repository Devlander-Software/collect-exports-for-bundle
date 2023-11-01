import auto from '@rollup/plugin-auto-install';
import commonjs from '@rollup/plugin-commonjs';
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import swcPreserveDirectives from "rollup-swc-preserve-directives";

import { readFileSync } from 'fs';




const createRollUpConfig = () => {
  const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const tsConfig = JSON.parse(readFileSync('./tsconfig.json', 'utf8'));
const dev = process.env.NODE_ENV !== 'production';
    try {
      if(!pkg.main) throw new Error("No main field in package.json")
      if(!pkg.module) throw new Error("No module field in package.json")
      if(!pkg.types) throw new Error("No types field in package.json")
      if(!tsConfig.compilerOptions) throw new Error("No compilerOptions field in tsconfig.json")
      if(!tsConfig.compilerOptions.declarationDir) throw new Error("No declarationDir field in compilerOptions in tsconfig.json")

        const { compilerOptions } = tsConfig;

        const globals = {
            devlanderCollectExportsForBundle: "devlanderCollectExportsForBundle",
            'fs': 'fs',
            'path': 'path',
            'picocolors': 'pc'
        };
        
        const treeshake = {
            moduleSideEffects: false,
            propertyReadSideEffects: false,
            tryCatchDeoptimization: false
        };
        
        const nodePlugins = [
            nodeResolve({
                extensions: [".ts", ".d.ts"],
            }),
            json(),
            commonjs({
                ignoreTryCatch: false,
                include: 'node_modules/**'
            }),
            typescript({
                sourceMap: true,
                inlineSources: true,
            }),
        ];
        
        const generalPlugins = [
            ...nodePlugins,
            terser({
                ecma: 2020,
                mangle: { toplevel: true },
                compress: {
                    toplevel: true,
                    drop_console: !dev,
                    drop_debugger: !dev,
                },
                output: { quote_style: 1 },
            }),
            swcPreserveDirectives(),
            auto(),
            peerDepsExternal(),
           
        ];
        
       
        
        const config = [
            {
                treeshake,
                input: './src/index.ts',
                output: [
                    {
                        file: pkg.main,
                        format: 'cjs',
                        sourcemap: true,
                        globals
                    },
                    {
                        file: pkg.module,
                        format: 'esm',
                        sourcemap: true,
                        exports: 'named',
                        globals
                    },
                ],
                plugins: generalPlugins,
            },
            {
                treeshake,
                input: `${compilerOptions.declarationDir}/index.d.ts`,
                output: [{ file: pkg.types, format: 'esm' }],
                plugins: [dts()],
            },
        ];

        return config;
    } catch (error) {
        throw error; // re-throwing the error allows for further handling if needed
    }
}

const config = createRollUpConfig();

export default config;
