// 测试页面路由配置
const routes = [
  {
    path: '/test/ajax',
    name: 'TestAjax',
    component: () => import('../views/test/Ajax.vue')
  },
  {
    path: '/test/tools',
    name: 'TestTools',
    component: () => import('../views/test/Tools.vue')
  },
  {
    path: '/test/ele',
    name: 'TestElementUI',
    component: () => import('../views/test/ElementUI.vue')
  },
  {
    path: '/test/comp',
    name: 'TestMyComp',
    component: () => import('../views/test/MyComp.vue')
  }
];

export default routes;
