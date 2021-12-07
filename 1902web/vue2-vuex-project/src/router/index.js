import Vue from 'vue'
import VueRouter from 'vue-router'
import vant_router from './vant'
import test_router from './test'
import message_router from './message'

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
    path: '/userinfo',
    name: 'UserInfo',
    component: () => import('../views/UserInfo.vue'),
  },
  {
    path: '/ajax',
    name: 'Ajax',
    component: () => import('../views/Ajax.vue'),
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/Map.vue'),
  },
  {
    path: '/link',
    name: 'Link',
    component: () => import('../views/Link.vue'),
  },
]
  .concat(vant_router)
  .concat(test_router)
  .concat(message_router)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
