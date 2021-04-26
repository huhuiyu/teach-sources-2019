import Vue from 'vue';
import VueRouter from 'vue-router';
// 测试页面路由配置
import test_routes from './test';
// 用户页面路由配置
import user_routes from './user';
// 用户页面路由配置
import euser_routes from './euser';
// 数据联动页面路由配置
import link_routes from './link';
// 数据联动页面路由配置
import emp_routes from './employee';
// 文件管理页面路由配置
import file_routes from './file';
// 地图相关页面路由配置
import map_routes from './map';

Vue.use(VueRouter);

// 路由配置信息
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
]
  .concat(map_routes)
  .concat(file_routes)
  .concat(test_routes)
  .concat(user_routes)
  .concat(euser_routes)
  .concat(link_routes)
  .concat(emp_routes);

const router = new VueRouter({
  routes
});

export default router;
