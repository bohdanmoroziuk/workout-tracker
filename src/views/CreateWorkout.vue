<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <div class="p-4 mb-10 bg-light-grey rounded-md shadow-lg" v-if="statusMessage">
      <p class="text-at-light-green">
        {{ statusMessage }}
      </p>
    </div>

    <div class="p-4 mb-10 bg-light-grey rounded-md shadow-lg" v-if="errorMessage">
      <p class="text-red-500">
        {{ errorMessage }}
      </p>
    </div>

    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <form
        @submit.prevent="createWorkout"
        class="flex flex-col gap-y-5 w-full"
      >
        <h2 class="text-2xl text-at-light-green">Record Workout</h2>

        <div class="flex flex-col">
          <label class="mb-1 text-sm text-at-light-green" for="workout-name">Name</label>
          <input
            class="p-2 text-gray-500 focus:outline-none"
            type="text"
            id="workout-name"
            v-model.trim="name"
            required
          />
        </div>

        <div class="flex flex-col">
          <label class="mb-1 text-sm text-at-light-green" for="workout-type">Type</label>
          <select
            class="p-2 text-gray-500 focus:outline-none"
            id="workout-type"
            v-model="type"
          >
            <option value="">Select Workout</option>
            <option value="strength">Strenth Training</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>

        <div class="flex flex-col gap-y-4" v-if="type === 'strength'">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
            v-for="exercise of exercises"
            :key="exercise.id"
          >
            <div class="flex flex-col md:w-1/3">
              <label class="mb-1 text-sm text-at-light-green" for="exercise-name">Name</label>
              <input
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                id="exercise-name"
                v-model="exercise.name"
                required
              />
            </div>

            <div class="flex flex-col flex-1">
              <label class="mb-1 text-sm text-at-light-green" for="exercise-sets">Sets</label>
              <input
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                id="exercise-sets"
                v-model="exercise.sets"
                required
              />
            </div>

            <div class="flex flex-col flex-1">
              <label class="mb-1 text-sm text-at-light-green" for="exercise-reps">Reps</label>
              <input
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                id="exercise-reps"
                v-model="exercise.reps"
                required
              />
            </div>

            <div class="flex flex-col flex-1">
              <label class="mb-1 text-sm text-at-light-green" for="exercise-weight">
                Weight (LB's)
              </label>
              <input
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                id="exercise-weight"
                v-model="exercise.weight"
                required
              />
            </div>

            <img
              class="h-4 w-auto absolute -left-5 cursor-pointer"
              src="@/assets/images/trash-light-green.png"
              alt="Delete"
              @click="deleteExercise(exercise)"
            />
          </div>

          <button
            class="
              mt-6 py-2 px-6 rounded-sm self-start text-sm
              text-white bg-at-light-green duration-200
              border-solid border-2 border-transparent hover:border-at-light-green
              hover:bg-white hover:text-at-light-green
            "
            type="button"
            @click="addExercise"
          >
            Add Exercise
          </button>
        </div>

        <div class="" v-if="type === 'cardio'">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
            v-for="exercise of exercises"
            :key="exercise.id"
          >
            <div class="flex flex-col md:w-1/3">
              <label class="mb-1 text-sm text-at-light-green" for="exercise-type">Type</label>
              <select
                class="p-2 w-full text-gray-500 focus:outline-none"
                id="exercise-type"
                v-model="exercise.type"
              >
                <option value="">Select Type</option>
                <option value="run">Run</option>
                <option value="walk">Walk</option>
              </select>
            </div>

            <div class="flex flex-col flex-1">
              <label class="mb-1 text-sm text-at-light-green" for="exercise-distance">
                Distance
              </label>
              <input
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                id="exercise-distance"
                v-model="exercise.distance"
                required
              />
            </div>

            <div class="flex flex-col flex-1">
              <label class="mb-1 text-sm text-at-light-green" for="exercise-duration">
                Duration
              </label>
              <input
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                id="exercise-duration"
                v-model="exercise.duration"
                required
              />
            </div>

            <div class="flex flex-col flex-1">
              <label class="mb-1 text-sm text-at-light-green" for="exercise-pace">
                Pace
              </label>
              <input
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                id="exercise-pace"
                v-model="exercise.pace"
                required
              />
            </div>

            <img
              class="h-4 w-auto absolute -left-5 cursor-pointer"
              src="@/assets/images/trash-light-green.png"
              alt="Delete"
              @click="deleteExercise(exercise)"
            />
          </div>

          <button
            class="
              mt-6 py-2 px-6 rounded-sm self-start text-sm
              text-white bg-at-light-green duration-200
              border-solid border-2 border-transparent hover:border-at-light-green
              hover:bg-white hover:text-at-light-green
            "
            type="button"
            @click="addExercise"
          >
            Add Exercise
          </button>
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
          Record Workout
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { nanoid } from 'nanoid';

import supabase from '../supabase';

export default {
  name: 'CreateWorkout',
  setup() {
    const name = ref('');
    const type = ref('');
    const exercises = ref([]);
    const errorMessage = ref('');
    const statusMessage = ref('');

    const showError = (message, duration) => {
      errorMessage.value = `Error: ${message}`;

      setTimeout(() => {
        errorMessage.value = '';
      }, duration);
    };

    const showStatus = (message, duration) => {
      statusMessage.value = `Status: ${message}`;

      setTimeout(() => {
        statusMessage.value = '';
      }, duration);
    };

    const addExercise = () => {
      if (type.value === 'strength') {
        exercises.value.push({
          id: nanoid(),
          nam: '',
          sets: '',
          reps: '',
          weight: '',
        });
      }

      if (type.value === 'cardio') {
        exercises.value.push({
          id: nanoid(),
          type: 'run',
          distance: '',
          duration: '',
          pace: '',
        });
      }
    };

    const deleteExercise = ({ id }) => {
      if (exercises.value.length > 1) {
        exercises.value = exercises.value.filter((exercise) => exercise.id !== id);
      } else {
        showError('Cannot remove, need to at least have one exercise', 3 * 1000);
      }
    };

    const resetExercises = () => {
      exercises.value = [];
      addExercise();
    };

    watch(type, resetExercises);

    const workout = computed(() => ({
      name: name.value,
      type: type.value,
      exercises: exercises.value,
    }));

    const resetWorkout = () => {
      name.value = '';
      type.value = '';
      exercises.value = [];
    };

    const createWorkout = async () => {
      try {
        const { error } = await supabase
          .from('workouts')
          .insert([workout.value]);

        showStatus('Workout created', 3 * 1000);
        resetWorkout();

        if (error) throw error;
      } catch (error) {
        showError(error.message, 5 * 1000);
      }
    };

    return {
      name,
      type,
      exercises,
      errorMessage,
      statusMessage,
      addExercise,
      deleteExercise,
      createWorkout,
    };
  },
};
</script>
