import { createRouter, createWebHistory } from 'vue-router';

import routes from '@/router/routes';
import store from '@/store';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | Workout Tracker`;
  }

  next();
});

router.beforeEach((to, _from, next) => {
  const isLoggedIn = !!store.state.user;
  const isPrivate = to.matched.some((record) => record.meta.private);

  if (isPrivate && !isLoggedIn) {
    return next({ name: 'Login' });
  }

  return next();
});

export default router;
