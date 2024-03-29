const routes = [
  {
    path: '/test/map',
    name: 'TestMap',
    component: () => import('../views/test/Map.vue'),
  },
  {
    path: '/test/link',
    name: 'TestLink',
    component: () => import('../views/test/Link.vue'),
  },
  {
    path: '/test/menus',
    name: 'TestMenus',
    component: () => import('../views/test/Menus.vue'),
  },
  {
    path: '/test/qs',
    name: 'TestQs',
    component: () => import('../views/test/Qs.vue'),
  },
  {
    path: '/test/qsinfo',
    name: 'TestQsInfo',
    component: () => import('../views/test/QsInfo.vue'),
  },
  {
    path: '/test/menu01',
    name: 'TestMenu01',
    component: () => import('../views/test/Menu01.vue'),
  },
  {
    path: '/test/menu02',
    name: 'TestMenu02',
    component: () => import('../views/test/Menu02.vue'),
  },
  {
    path: '/test/menus/:comp',
    name: 'TestMenuInfo',
    component: () => import('../views/test/MenuInfo.vue'),
  },
]

export default routes
