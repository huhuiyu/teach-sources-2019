// 员工管理页面路由配置
const routes = [
  {
    path: '/emp/dept',
    name: 'Dept',
    component: () => import('../views/employee/Dept.vue')
  }
];

export default routes;
