<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <div class="mb-10 p-4 rounded-md bg-light-grey shadow-lg" v-if="errorMessage">
      <p class="text-red-500">
        {{ errorMessage }}
      </p>
    </div>

    <form @submit.prevent="login" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
      <h2 class="text-3xl text-at-light-green mb-4">
        Login
      </h2>

      <div class="flex flex-col mb-2">
        <label class="mb-1 text-sm text-at-light-green" for="email">
          Email
        </label>
        <input
          class="p-2 text-gray-500 focus:outline-none"
          type="email"
          id="email"
          required
          v-model="email"
        />
      </div>

      <div class="flex flex-col mb-2">
        <label class="mb-1 text-sm text-at-light-green" for="password">
          Password
        </label>
        <input
          class="p-2 text-gray-500 focus:outline-none"
          type="password"
          id="password"
          required
          v-model="password"
        />
      </div>

      <button
        class="
          mt-6 py-2 px-6 rounded-sm self-start text-sm
          text-white bg-at-light-green duration-200
          border-solid border-2 border-transparent hover:border-at-light-green
          hover:bg-white hover:text-at-light-green
        "
        type="submit"
      >
        Login
      </button>

      <router-link class="text-sm mt-6 text-center" :to="{ name: 'Register' }">
        Don't have an account? <span class="text-at-light-green">Register</span>
      </router-link>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import supabase from '../supabase';

export default {
  name: 'Login',
  setup() {
    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const showError = (message, duration) => {
      errorMessage.value = `Error: ${message}`;

      setTimeout(() => {
        errorMessage.value = '';
      }, duration);
    };

    const login = async () => {
      try {
        const { error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });

        if (error) throw error;

        router.push({ name: 'Home' }).catch(() => {});
      } catch (error) {
        showError(error.message, 3 * 1000);
      }
    };

    return {
      email,
      password,
      errorMessage,
      login,
    };
  },
};
</script>
