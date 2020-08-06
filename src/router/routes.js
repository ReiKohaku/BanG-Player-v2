
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'index', path: '', component: () => import('pages/Index.vue') },
      { name: 'official', path: 'official', component: () => import('pages/Select/Official.vue') },
      { name: 'bestdori', path: 'bestdori', component: () => import('pages/Select/Bestdori.vue') },
      { name: 'settings', path: 'settings', component: () => import('pages/Settings.vue') },
      { name: 'info', path: 'info', component: () => import('pages/Select/Info.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
