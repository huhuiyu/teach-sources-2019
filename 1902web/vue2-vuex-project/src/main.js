import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import myplugins from './plugins/myplugins'
Vue.use(myplugins)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
