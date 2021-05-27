import Vue from 'vue';
import VueRouter from 'vue-router';
// 测试页面路由配置
import test_routes from './test';
// 管理页面路由配置
import manage_routes from './manage';

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
  .concat(test_routes)
  .concat(manage_routes);

const router = new VueRouter({
  routes
});

export default router;
