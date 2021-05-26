// 测试页面路由配置
const routes = [
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/test/Home.vue')
  }
];

export default routes;
