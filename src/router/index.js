import { createRouter, createWebHistory } from 'vue-router';

import routes from '@/router/routes';

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

export default router;
