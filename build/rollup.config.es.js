import base from './rollup.config.base'
const globals = { vue: 'Vue' }

const config = Object.assign({}, base, {
  output: {
    globals,
    file: 'dist/vue-webble.esm.js',
    format: 'esm',
    sourcemap: true
  }
})

export default config
