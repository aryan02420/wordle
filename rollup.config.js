import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { string } from "rollup-plugin-string";
import typescript from '@rollup/plugin-typescript'
import dts from "rollup-plugin-dts"

/** @type {import('rollup').RollupOptions} */
export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/umd/wordle.js',
        format: 'umd',
        name: 'Wordle',
      },
      {
        file: 'dist/cjs/wordle.js',
        format: 'cjs',
      },
      {
        file: 'dist/esm/wordle.js',
        format: 'esm',
      },
      {
        file: 'dist/amd/wordle.js',
        format: 'amd',
      },
    ],
    plugins: [nodeResolve(), commonjs(), json(), typescript()],
  },
  {
    input: 'src/bin/index.ts',
    output: {
      file: 'dist/cjs/cli.js',
      format: 'cjs',
      banner: '#!/usr/bin/env node',
    },
    plugins: [nodeResolve(), commonjs(), json(), typescript()],
  },
  {
    input: 'src/server/index.ts',
    output: {
      file: 'dist/cjs/server.js',
      format: 'cjs',
    },
    plugins: [nodeResolve(), commonjs(), json(), typescript()],
  },
  {
    input: 'src/actions/index.ts',
    output: {
      file: 'dist/cjs/actions.js',
      format: 'cjs',
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      json(),
      string({
        include: "**/*.tmpl"
      }),
      typescript()
    ],
  },
  {
    input: "./src/index.ts",
    output: [
      { file: "dist/index.d.ts", format: "esm" },
    ],
    plugins: [dts()],
  },
]
