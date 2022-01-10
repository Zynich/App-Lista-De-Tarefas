import Vue from 'vue'
import App from './App.vue'
import bootstrap from './bootstrap'
import "normalize.css"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false
Vue.use(bootstrap);
new Vue({
  render: h => h(App),
}).$mount('#app')
