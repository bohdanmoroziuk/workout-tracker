import { reactive } from 'vue';

const state = reactive({
  user: null,
});

const setUser = (payload) => {
  state.user = payload?.user;
};

export default {
  state,
  methods: {
    setUser,
  },
};
