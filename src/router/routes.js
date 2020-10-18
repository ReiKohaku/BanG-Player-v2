import Store from 'src/store';
import {Bestdori} from 'src/lib/api/bestdori.js';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'index', path: '', component: () => import('pages/Index.vue') },
      { name: 'official', path: 'official', component: () => import('pages/Select/Official.vue') },
      { name: 'officialId', path: 'official/:id', component: () => import('pages/Select/OfficialId.vue') },
      { name: 'bestdori', path: 'bestdori', component: () => import('pages/Select/Bestdori.vue') },
      { name: 'bestdoriId', path: 'bestdori/:id', component: () => import('pages/Select/BestdoriId.vue') },
      { name: 'local', path: 'local', component: () => import('pages/Select/Local.vue') },
      { name: 'settings', path: 'settings', component: () => import('pages/Settings.vue') },
      { name: 'favorite', path: 'favorite', component: () => import('pages/Select/Favorite.vue') },
      { name: 'info', path: 'info', component: () => import('pages/Select/Info.vue') },
      { name: 'notification', path: 'notification', component: () => import('pages/Notification.vue') },
      { name: 'ebbb', path: 'ebbb', component: () => import('pages/EbbbTest.vue') }
    ]
  },
  {
    name: 'game',
    path: '/game',
    component: () => import('pages/Game.vue')
  },
  {
    name: 'wiki',
    path: '/wiki',
    component: () => import('pages/Wiki.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
