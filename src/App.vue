<template>
  <div class="min-h-full font-Poppins box-border" v-if="isReady">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import { ref } from 'vue';
import store from '@/store';
import supabase from '@/supabase';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  setup() {
    const isReady = ref(false);

    const user = supabase.auth.user();

    if (!user) {
      isReady.value = true;
    }

    supabase.auth.onAuthStateChange((_, session) => {
      store.methods.setUser(session);
      isReady.value = true;
    });

    return {
      isReady,
    };
  },
};
</script>
