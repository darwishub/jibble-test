import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/favorites', name: 'favorites', component: () => import('@/views/FavouritesView.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  // Use hash history for better compatibility with static hosting
  history: import.meta.env.PROD ? createWebHashHistory() : createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
