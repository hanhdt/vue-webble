import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'

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
      buble()
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
      buble()
    ]
  }
]
