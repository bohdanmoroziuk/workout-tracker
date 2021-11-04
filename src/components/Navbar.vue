<template>
  <header class="bg-at-light-green text-white">
    <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
      <div class="flex items-center gap-x-4">
        <img class="w-14" src="@/assets/images/dumbbell-light.png" alt="Logo" />
        <h1 class="text-lg">Workout Tracker</h1>
      </div>
      <ul class="flex flex-1 justify-end gap-x-10">
        <router-link :to="{ name: 'Home' }">
          Home
        </router-link>
        <router-link :to="{ name: 'CreateWorkout' }" v-if="user">
          Create
        </router-link>
        <router-link :to="{ name: 'Login' }" v-if="!user">
          Login
        </router-link>
        <li class="cursor-pointer" @click="logout" v-if="user">
          Logout
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import store from '@/store';
import supabase from '@/supabase';

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter();

    const user = computed(() => store.state.user);

    const logout = async () => {
      await supabase.auth.signOut();
      router.push({ name: 'Login' }).catch(() => {});
    };

    return {
      user,
      logout,
    };
  },
};
</script>
