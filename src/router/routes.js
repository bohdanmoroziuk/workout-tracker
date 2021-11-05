export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/create',
    name: 'CreateWorkout',
    component: () => import('@/views/CreateWorkout.vue'),
  },
  {
    path: '/workouts/:workoutId',
    props: true,
    name: 'ViewWorkout',
    component: () => import('@/views/ViewWorkout.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
];
