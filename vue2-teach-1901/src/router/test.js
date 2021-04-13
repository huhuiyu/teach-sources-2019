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
    path: '/test/elementui',
    name: 'TestElementUI',
    component: () => import('../views/test/ElementUI.vue')
  },
  {
    path: '/test/mycomp',
    name: 'TestMyComp',
    component: () => import('../views/test/MyComp.vue')
  },
  // 动态路由配置，动态的部分是:开头加动态路径
  // 也就是下面的路由必须通过/test/myothercomp/动态路径访问
  // 而不可以是/test/myothercomp
  // 地址栏访问是不要加:
  {
    path: '/test/myothercomp/:path',
    name: 'TestMyOtherComp',
    component: () => import('../views/test/MyOtherComp.vue')
  },
  {
    path: '/test/file',
    name: 'TestFile',
    component: () => import('../views/test/File.vue')
  }
];

export default routes;
