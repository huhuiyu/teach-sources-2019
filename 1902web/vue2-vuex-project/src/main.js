import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import myplugins from './plugins/myplugins'
Vue.use(myplugins)

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import 'ant-design-vue/dist/antd.css'
import antd from 'ant-design-vue'
Vue.use(antd)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
