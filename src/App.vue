<template>
  <div class="min-h-full font-Poppins box-border">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  setup() {
  },
};
</script>
