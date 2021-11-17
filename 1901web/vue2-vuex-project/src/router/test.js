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
]

export default routes
