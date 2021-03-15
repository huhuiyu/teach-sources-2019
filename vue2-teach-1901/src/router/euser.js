// 用户页面路由配置
const routes = [
  {
    path: '/euser/login',
    name: 'EleUserLogin',
    component: () => import('../views/euser/Login.vue')
  },
  {
    path: '/euser/main',
    name: 'EleUserMain',
    component: () => import('../views/euser/Main.vue')
  }
];

export default routes;
