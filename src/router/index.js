// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import { useTokenStore } from '@/stores/token.js';
import DashboardView from '@/views/DashboardView.vue';
import EventView from '@/views/EventView.vue';
import LoginView from '@/views/LoginView.vue';
import CreateView from '@/views/CreateView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

let eventParam = null
const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/events',
    name: 'events',
    component: EventView,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/create',
    name: 'create',
    component: CreateView,
  },
  {
    path: '/event/:id',
    name: 'event',
    props: true,
    component: EventView,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    redirect: { name: 'dashboard' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const tokenStore = useTokenStore();
  console.log('Navigating to:', to);
  console.log('Navigating from:', from);
  console.log('User authenticated:', tokenStore.isAuthenticated);

  if (to.matched.some(record => record.meta.requiresAuth) && !tokenStore.isAuthenticated) {
    if (to.name === 'event') {
      console.log('Setting eventParam:', to.params.id)
      eventParam = to.params.id
    }

    next('/login');
  } else if (to.name === 'login' && tokenStore.isAuthenticated) {
    next({ name: 'dashboard' });
  }
  else if (tokenStore.isAuthenticated && eventParam != null) {
    console.log('Navigating to event:', eventParam)
    next({ name: 'event', params: { id: eventParam } })
    eventParam = null
  }
  else {
    next();
  }
});

export default router;
