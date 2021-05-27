// 管理页面路由配置
const routes = [
  {
    path: '/manage/one',
    name: 'ManageOne',
    component: () => import('../views/manage/One.vue')
  },
  {
    path: '/manage/two',
    name: 'ManageTwo',
    component: () => import('../views/manage/Two.vue')
  }
];

export default routes;
