const routes = [
  {
    path: '/test/map',
    name: 'TestMap',
    component: () => import('../views/test/Map.vue'),
  },{
    path: '/test/link',
    name: 'TestLink',
    component: () => import('../views/test/Link.vue'),
  },
]

export default routes
