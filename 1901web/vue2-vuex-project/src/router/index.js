import Vue from 'vue'
import VueRouter from 'vue-router'
import vant_routes from './vant'
import test_routes from './test'
import message_routes from './message'
import antd_routes from './antd'

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
  {
    path: '/Q1',
    name: 'Q1',
    component: () => import('../views/Q1.vue'),
  },
  {
    path: '/Q2',
    name: 'Q2',
    component: () => import('../views/Q2.vue'),
  },
]
  .concat(vant_routes)
  .concat(test_routes)
  .concat(message_routes)
  .concat(antd_routes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
