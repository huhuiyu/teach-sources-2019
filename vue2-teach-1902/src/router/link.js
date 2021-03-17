// 联动页面路由配置
const routes = [
  {
    path: '/link/city',
    name: 'LinkCity',
    component: () => import('../views/link/City.vue')
  }
];

export default routes;
