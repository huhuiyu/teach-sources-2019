import Vue from 'vue';
import VueRouter from 'vue-router';
// 测试页面路由配置
import test_routes from './test';
// 用户页面路由配置
import user_routes from './user';

Vue.use(VueRouter);

// 路由配置信息
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
]
  .concat(test_routes)
  .concat(user_routes);

const router = new VueRouter({
  routes
});

export default router;
