export default [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Home',
    },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/create',
    name: 'CreateWorkout',
    meta: {
      title: 'Create Workout',
    },
    component: () => import('@/views/CreateWorkout.vue'),
  },
  {
    path: '/workouts/:workoutId',
    props: true,
    name: 'ViewWorkout',
    meta: {
      title: 'View Workout',
    },
    component: () => import('@/views/ViewWorkout.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: 'Register',
    },
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Login',
    },
    component: () => import('@/views/Login.vue'),
  },
];
