<template>
  <div class="max-w-screen-sm mx-auto py-10 px-4">
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

    <form v-if="isLoaded">
      <div class="flex flex-col items-center p-8 rounded-md shadow-md bg-light-grey relative">
        <div class="flex absolute left-2 top-2 gap-x-2" v-if="isLoggedIn">
          <div
            class="
              w-7 h-7 rounded-full flex justify-center
              items-center cursor-pointer bg-at-light-green shadow-lg
            "
            @click="toggleEditMode"
          >
            <img
              class="w-auto h-3.5"
              src="@/assets/images/pencil-light.png"
              alt="Toggle Edit Mode"
            />
          </div>
          <div
            class="
              w-7 h-7 rounded-full flex justify-center
              items-center cursor-pointer bg-at-light-green shadow-lg
            "
            @click="deleteWorkout"
          >
            <img
              class="w-auto h-3.5"
              src="@/assets/images/trash-light.png"
              alt="Delete Workout"
            />
          </div>
        </div>

        <img
          class="h-24 w-auto"
          src="@/assets/images/dumbbell-light-green.png"
          alt="Strength Training"
          v-if="workout.type === 'strength'"
        />
        <img
          class="h-24 w-auto"
          src="@/assets/images/running-light-green.png"
          alt="Cardio"
          v-if="workout.type === 'cardio'"
        />

        <span class="mt-6 py-1.5 px-5 text-xs text-white bg-at-light-green rounded-lg shadow-md">
          {{ workout.type }}
        </span>

        <div class="w-full mt-6">
          <input
            class="p-2 w-full text-gray-500 focus:outline-none"
            type="text"
            v-model="workout.name"
            v-if="isEditMode"
          />
          <h2 class="text-at-light-green text-2xl text-center" v-else>
            {{ workout.name }}
          </h2>
        </div>
      </div>

      <div class="mt-10 p-8 rounded-md flex flex-col items-center bg-light-grey shadow-md">
        <div class="flex flex-col gap-y-4 w-full" v-if="workout.type === 'strength'">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
            v-for="exercise of workout.exercises"
            :key="exercise.id"
          >
            <div class="flex flex-2 flex-col md:w-1/3">
              <label class="mb-1 text-sm text-at-light-green" for="exercise-name">Name</label>
              <input
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                id="exercise-name"
                v-model="exercise.name"
                v-if="isEditMode"
              />
              <p v-else>{{ exercise.name }}</p>
            </div>

            <div class="flex flex-1 flex-col">
              <label class="mb-1 text-sm text-at-light-green" for="exercise-sets">Sets</label>
              <input
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                id="exercise-sets"
                v-model="exercise.sets"
                v-if="isEditMode"
              />
              <p v-else>{{ exercise.sets }}</p>
            </div>

            <div class="flex flex-1 flex-col">
              <label class="mb-1 text-sm text-at-light-green" for="exercise-reps">Reps</label>
              <input
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                id="exercise-reps"
                v-model="exercise.reps"
                v-if="isEditMode"
              />
              <p v-else>{{ exercise.reps }}</p>
            </div>

            <div class="flex flex-1 flex-col">
              <label class="mb-1 text-sm text-at-light-green" for="exercise-weight">
                Weight (LB's)
              </label>
              <input
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                id="exercise-weight"
                v-model="exercise.weight"
                v-if="isEditMode"
              />
              <p v-else>{{ exercise.weight }}</p>
            </div>

            <img
              class="absolute h-4 w-auto -left-5 cursor-pointer"
              src="@/assets/images/trash-light-green.png"
              alt="Delete Exercise"
              @click="deleteExercise(exercise)"
              v-if="isEditMode"
            />
          </div>

          <button
            class="
              mt-6 py-2 px-6 rounded-sm self-start text-sm
              text-white bg-at-light-green duration-200
              border-solid border-2 border-transparent hover:border-at-light-green
              hover:bg-at-light-green hover:text-at-light-green
            "
            type="button"
            @click="addExercise"
            v-if="isEditMode"
          >
            Add Exercise
          </button>
        </div>

        <div class="flex flex-col gap-y-4 w-full" v-if="workout.type === 'cardio'">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
            v-for="exercise of workout.exercises"
            :key="exercise.id"
          >
            <div class="flex flex-2 flex-col md:w-1/3">
              <label class="mb-1 text-sm text-at-light-green" for="exercise-type">Type</label>
              <select
                class="p-2 w-full text-gray-500 focus:outline-none"
                id="exercise-type"
                v-model="exercise.type"
                v-if="isEditMode"
              >
                <option value="">Select Type</option>
                <option value="run">Run</option>
                <option value="walk">Walk</option>
              </select>
              <p v-else>{{ exercise.type }}</p>
            </div>

            <div class="flex flex-1 flex-col">
              <label class="mb-1 text-sm text-at-light-green" for="exercise-distance">
                Distance
              </label>
              <input
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                id="exercise-distance"
                v-model="exercise.distance"
                v-if="isEditMode"
              />
              <p v-else>{{ exercise.distance }}</p>
            </div>

            <div class="flex flex-1 flex-col">
              <label class="mb-1 text-sm text-at-light-green" for="exercise-duration">
                Duration
              </label>
              <input
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                id="exercise-duration"
                v-model="exercise.duration"
                v-if="isEditMode"
              />
              <p v-else>{{ exercise.duration }}</p>
            </div>

            <div class="flex flex-1 flex-col">
              <label class="mb-1 text-sm text-at-light-green" for="exercise-pace">
                Pace
              </label>
              <input
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                id="exercise-pace"
                v-model="exercise.pace"
                v-if="isEditMode"
              />
              <p v-else>{{ exercise.pace }}</p>
            </div>

            <img
              class="absolute h-4 w-auto -left-5 cursor-pointer"
              src="@/assets/images/trash-light-green.png"
              alt="Delete Exercise"
              @click="deleteExercise(exercise)"
              v-if="isEditMode"
            />
          </div>

          <button
            class="
              mt-6 py-2 px-6 rounded-sm self-start text-sm
              text-white bg-at-light-green duration-200
              border-solid border-2 border-transparent hover:border-at-light-green
              hover:bg-at-light-green hover:text-at-light-green
            "
            type="button"
            @click="addExercise"
            v-if="isEditMode"
          >
            Add Exercise
          </button>
        </div>
      </div>

      <button
        class="
          mt-10 py-2 px-6 rounded-sm self-start text-sm
          text-white bg-at-light-green duration-200
          border-solid border-2 border-transparent hover:border-at-light-green
          hover:bg-at-light-green hover:text-at-light-green
        "
        type="submit"
        v-if="isEditMode"
      >
        Update Workout
      </button>
    </form>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';

import { nanoid } from 'nanoid';

import supabase from '../supabase';
import store from '../store';

export default {
  name: 'ViewWorkout',
  props: {
    workoutId: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props) {
    const workout = ref({});
    const isLoaded = ref(false);
    const errorMessage = ref('');
    const statusMessage = ref('');
    const isEditMode = ref(false);

    const isLoggedIn = computed(() => !!store.state.user);

    const router = useRouter();

    const toggleEditMode = () => {
      isEditMode.value = !isEditMode.value;
    };

    const showError = (message, duration) => {
      errorMessage.value = `Error: ${message}`;

      setTimeout(() => {
        errorMessage.value = '';
      }, duration);
    };

    // const showStatus = (message, duration) => {
    //   statusMessage.value = `Status: ${message}`;

    //   setTimeout(() => {
    //     statusMessage.value = '';
    //   }, duration);
    // };

    const getWorkout = async () => {
      try {
        isLoaded.value = false;

        const { data: [data], error } = await supabase
          .from('workouts')
          .select('*')
          .eq('id', props.workoutId);

        if (error) throw error;

        workout.value = data;
      } catch (error) {
        showError(error.message, 3 * 1000);
      } finally {
        isLoaded.value = true;
      }
    };

    const deleteWorkout = async () => {
      try {
        const { error } = await supabase
          .from('workouts')
          .delete()
          .eq('id', props.workoutId);

        if (error) throw error;

        router.push({ name: 'Home' }).catch(() => {});
      } catch (error) {
        showError(error.message);
      }
    };

    const addExercise = () => {
      if (workout.value.type === 'strength') {
        workout.value.exercises.push({
          id: nanoid(),
          nam: '',
          sets: '',
          reps: '',
          weight: '',
        });
      }

      if (workout.value.type === 'cardio') {
        workout.value.exercises.push({
          id: nanoid(),
          type: 'run',
          distance: '',
          duration: '',
          pace: '',
        });
      }
    };

    const deleteExercise = ({ id }) => {
      if (workout.value.exercises.length > 1) {
        workout.value.exercises = workout.value.exercises.filter((exercise) => exercise.id !== id);
      } else {
        showError('Cannot remove, need to at least have one exercise', 3 * 1000);
      }
    };

    watch(() => props.workoutId, getWorkout, { immediate: true });

    return {
      workout,
      isLoaded,
      isEditMode,
      isLoggedIn,
      errorMessage,
      statusMessage,
      addExercise,
      deleteExercise,
      deleteWorkout,
      toggleEditMode,
    };
  },
};
</script>
