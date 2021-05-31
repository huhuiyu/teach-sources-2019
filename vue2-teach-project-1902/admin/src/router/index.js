import Vue from 'vue';
import VueRouter from 'vue-router';
// 测试页面路由配置
import test_routes from './test';
// 门户页面路由配置
import portable_routes from './portable';

Vue.use(VueRouter);

// 路由配置信息
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue')
  }
]
  .concat(portable_routes)
  .concat(test_routes);

const router = new VueRouter({
  routes
});

export default router;
