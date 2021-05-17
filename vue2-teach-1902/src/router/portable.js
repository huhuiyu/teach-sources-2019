// 门户管理页面路由配置
const routes = [
  {
    path: '/portable',
    name: 'Portable',
    component: () => import('../views/portable/Home.vue')
  }
];

export default routes;
