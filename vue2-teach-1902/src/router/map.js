// 地图关联页面路由配置
const routes = [
  {
    path: '/map/basic',
    name: 'MapBasic',
    component: () => import('../views/map/Basic.vue')
  }
];

export default routes;
