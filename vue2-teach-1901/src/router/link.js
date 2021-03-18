// 数据联动路由配置
const routes = [
  {
    path: '/link/links',
    name: 'Links',
    component: () => import('../views/link/Links.vue')
  }
];

export default routes;
