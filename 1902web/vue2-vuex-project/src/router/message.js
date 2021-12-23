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
  {
    path: '/message/q01',
    name: 'MessageQ01',
    component: () => import('../views/message/Q01.vue'),
  },
  {
    path: '/message/q02',
    name: 'MessageQ02',
    component: () => import('../views/message/Q02.vue'),
  },
]

export default routes
