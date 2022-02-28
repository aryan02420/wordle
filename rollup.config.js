import typescript from '@rollup/plugin-typescript'

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
    input: 'src/bin/wordle-cli.ts',
    output: {
      file: 'dist/cjs/bin/wordle-cli.js',
      format: 'cjs',
      banner: '#!/usr/bin/env node',
    },
    external: ['../'],
    plugins: [typescript()],
  },
  {
    input: 'src/server/server.ts',
    output: {
      file: 'dist/cjs/server/server.js',
      format: 'cjs',
    },
    external: ['../'],
    plugins: [typescript()],
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
