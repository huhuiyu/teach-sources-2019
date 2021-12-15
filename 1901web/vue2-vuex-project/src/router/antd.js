const routes = [
  {
    path: '/antd',
    name: 'AntdHome',
    component: () => import('../views/antd/Home.vue'),
  },
  {
    path: '/antd/file',
    name: 'AntdFile',
    component: () => import('../views/antd/File.vue'),
  },
]

export default routes
