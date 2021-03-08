// 用户页面路由配置
const routes = [
  {
    path: '/user/reg',
    name: 'UserReg',
    component: () => import('../views/user/Reg.vue')
  },
  {
    path: '/user/login',
    name: 'UserLogin',
    component: () => import('../views/user/Login.vue')
  }
];

export default routes;
