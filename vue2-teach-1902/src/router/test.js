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
  },
  // 动态路由配置
  // :动态路径 表示该路径是可以动态指定
  // 访问方式是/基本路由路径/动态路径，访问时没有:
  // 例如下面的访问方式应该：/test/othercomp/abc这样的
  {
    path: '/test/othercomp/:path',
    name: 'TestMyOtherComp',
    component: () => import('../views/test/MyOtherComp.vue')
  }
];

export default routes;
