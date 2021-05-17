// 门户信息管理路由配置
const routes = [
  {
    path: '/portable',
    name: 'Portable',
    component: () => import('../views/portable/Home.vue')
  }
];

export default routes;
