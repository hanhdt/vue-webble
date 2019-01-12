import Vue from 'vue'
import App from './App.vue'
import VueWebble from '../../dist/vue-webble.esm'

Vue.use(VueWebble)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
