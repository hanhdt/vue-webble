import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import async from 'rollup-plugin-async'

export default [
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      name: 'VueWebble',
      file: 'dist/vue-webble.esm.js',
      sourcemap: true
    },
    plugins: [
      vue({
        css: true,
        compileTemplate: true
      }),
      buble(),
      async()
    ]
  },
  // Browser build.
  {
    input: 'src/index.js',
    output: {
      format: 'iife',
      name: 'VueWebble',
      file: 'dist/vue-webble.min.js',
      sourcemap: true
    },
    plugins: [
      vue({
        css: true,
        compileTemplate: true
      }),
      buble(),
      async()
    ]
  }
]
