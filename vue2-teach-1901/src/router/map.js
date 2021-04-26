// 文件管理路由配置
const routes = [
  {
    path: '/map/basic',
    name: 'MapBasic',
    component: () => import('../views/map/Basic.vue')
  }
];

export default routes;
