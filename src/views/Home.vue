<template>
  <div class="container mt-10 px-4" v-if="isLoaded">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      v-if="hasWorkouts"
    >
      <router-link
        class="flex flex-col items-center bg-light-grey p-8 shadow-md"
        :to="{ name: '' }"
        v-for="workout of workouts"
        :key="workout.id"
      >
        <img
          class="h-24 w-auto"
          src="@/assets/images/running-light-green.png"
          alt="Cardio"
          v-if="workout.type === 'cardio'"
        />
        <img
          class="h-24 w-auto"
          src="@/assets/images/dumbbell-light-green.png"
          alt="Strength Training"
          v-if="workout.type === 'strength'"
        />
        <p class="mt-6 py-1 px-3 text-xs text-white bg-at-light-green shadow-md rounded-lg">
          {{ workout.type }}
        </p>
        <h3 class="mt-8 mb-2 text-center text-xl text-at-light-green">
          {{ workout.name }}
        </h3>
      </router-link>
    </div>
    <div class="w-full flex flex-col items-center" v-else>
      <h2 class="text-2xl">
        Looks empty here...
        <router-link
          class="
            mt-6 py-2 px-6 rounded-sm text-sm
            text-white bg-at-light-green duration-200
            border-solid border-2 border-transparent hover:border-at-light-green
            hover:bg-white hover:text-at-light-green
          "
          :to="{ name: 'CreateWorkout' }"
        >
          Create Workout
        </router-link>
      </h2>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

import supabase from '../supabase';

export default {
  name: 'Home',
  setup() {
    const workouts = ref([]);
    const isLoaded = ref(false);

    const hasWorkouts = computed(() => (
      workouts.value.length > 0
    ));

    const getWorkouts = async () => {
      try {
        isLoaded.value = false;

        const { data, error } = await supabase.from('workouts').select('*');

        if (error) throw error;

        workouts.value = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        isLoaded.value = true;
      }
    };

    getWorkouts();

    return {
      workouts,
      isLoaded,
      hasWorkouts,
    };
  },
};
</script>
