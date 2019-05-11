import base from './rollup.config.base'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'
const globals = { vue: 'Vue' }

const config = Object.assign({}, base, {
  output: {
    globals,
    name: 'VueWebble',
    file: 'dist/vue-webble.min.js',
    format: 'iife',
    sourcemap: true
  }
})

config.plugins.push(uglify.uglify({}, minify))

export default config
