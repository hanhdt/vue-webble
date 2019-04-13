/*
* Vue-Webble index.js
* Author: tranduchanh.ms@gmail.com
* Github: https://github.com/hanhdt/vue-webble
*/

import VueWebble from './components/VueWebble.vue'
import { initErrorHandling } from './utils/error'


function registerComponent (Vue) {
  Vue.component(VueWebble.name, VueWebble)
}

const plugin = {
  version: '0.1.0',
  install (Vue) {
		initErrorHandling(Vue)
    registerComponent(Vue)
	}
}

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue
}
if (GlobalVue) {
	GlobalVue.use(plugin)
}

export default plugin
