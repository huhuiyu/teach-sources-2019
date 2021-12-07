import Vue from 'vue'
import VueRouter from 'vue-router'
import vant_routes from './vant'
import test_routes from './test'
import message_routes from './message'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue'),
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import('../views/Reg.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
  },
]
  .concat(vant_routes)
  .concat(test_routes)
  .concat(message_routes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
