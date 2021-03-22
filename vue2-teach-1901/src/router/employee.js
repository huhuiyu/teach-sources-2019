// 员工信息相关路由配置
const routes = [
  {
    path: '/emp/dept',
    name: 'Dept',
    component: () => import('../views/employee/Dept.vue')
  },
  {
    path: '/emp/employee',
    name: 'Employee',
    component: () => import('../views/employee/Employee.vue')
  }
];

export default routes;
