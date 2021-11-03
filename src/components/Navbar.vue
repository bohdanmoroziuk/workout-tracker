<template>
  <header class="bg-at-light-green text-white">
    <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
      <div class="flex items-center gap-x-4">
        <img class="w-14" src="@/assets/images/dumbbell-light.png" alt="Logo" />
        <h1 class="text-lg">Workout Tracker</h1>
      </div>
      <ul class="flex flex-1 justify-end gap-x-10">
        <router-link
          v-for="link of links"
          :key="link.label"
          :to="link.to"
        >
          {{ link.label }}
        </router-link>
        <li class="cursor-pointer" @click="logout">
          Logout
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import supabase from '../supabase';

export default {
  name: 'Navbar',
  setup() {
    const links = ref([
      {
        to: { name: 'Home' },
        label: 'Home',
      },
      {
        to: { name: '' },
        label: 'Create',
      },
      {
        to: { name: 'Login' },
        label: 'Login',
      },
    ]);

    const router = useRouter();

    const logout = async () => {
      await supabase.auth.signOut();
      router.push({ name: 'Login' }).catch(() => {});
    };

    return {
      links,
      logout,
    };
  },
};
</script>
