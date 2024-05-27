import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventView from '../views/EventView.vue'
import {useTokenStore} from "@/stores/token.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/events',
      name: 'events',
      component: EventView,
      meta: {
          requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ '../views/NotFoundView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// Navigation guard to check authentication status
router.beforeEach((to, from, next) => {
  const authStore = useTokenStore();
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated) {
    // Redirect to login page if authentication is required but user is not authenticated
    next('/login');
  } else {
    // Continue with navigation
    console.log('User is authenticated');
    next();
  }
});

export default router
