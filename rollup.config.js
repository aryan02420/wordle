import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

/** @type {import('rollup').RollupOptions} */
export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/umd/wordle.js',
      format: 'umd',
      name: 'Wordle',
    },
    plugins: [typescript()],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/cjs/wordle.js',
      format: 'cjs',
    },
    plugins: [typescript()],
  },
  {
    input: 'src/bin/index.ts',
    output: {
      file: 'dist/cjs/cli.js',
      format: 'cjs',
      banner: '#!/usr/bin/env node',
    },
    plugins: [typescript()],
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
    plugins: [nodeResolve(), commonjs(), json(), typescript()],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/esm/wordle.js',
      format: 'es',
    },
    plugins: [typescript()],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/amd/wordle.js',
      format: 'amd',
    },
    plugins: [typescript()],
  },
]
