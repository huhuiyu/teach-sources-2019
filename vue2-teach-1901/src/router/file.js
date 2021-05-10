// 文件管理路由配置
const routes = [
  {
    path: '/file/manage',
    name: 'FileManage',
    component: () => import('../views/file/Home.vue')
  },
  {
    path: '/file/editor',
    name: 'WangEditor',
    component: () => import('../views/file/WangEditor.vue')
  },
  {
    path: '/file/myeditor',
    name: 'MyEditor',
    component: () => import('../views/file/MyEditor.vue')
  }
];

export default routes;
