const routes = [
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/message/Home.vue'),
  },
  {
    path: '/message/detail/:umid',
    name: 'MessageDetail',
    component: () => import('../views/message/Detail.vue'),
  },
  {
    path: '/message/flash',
    name: 'MessageFlash',
    component: () => import('../views/message/Flash.vue'),
  },
]

export default routes
