// 门户页面路由配置
const routes = [
  {
    path: '/portable',
    name: 'Portable',
    component: () => import('../views/portable/Home.vue')
  },
  {
    path: '/portable/info',
    name: 'PortableInfo',
    component: () => import('../views/portable/Info.vue')
  }
];

export default routes;
