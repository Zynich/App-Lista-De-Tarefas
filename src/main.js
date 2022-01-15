import Vue from 'vue'
import App from './App.vue'
import bootstrap from './bootstrap'
import "normalize.css"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { ValidationObserver, ValidationProvider, extend, localize} from 'vee-validate';
import pt_BR from 'vee-validate/dist/locale/pt_BR.json';
import * as rules from 'vee-validate/dist/rules';

// Add a rule.
extend('min', {
  validate(value, args) {
    return value.length >= args.length;
  },
  params: ['length']
});

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("pt_BR", pt_BR);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false
Vue.use(bootstrap);
new Vue({
  render: h => h(App),
}).$mount('#app')
