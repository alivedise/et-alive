import Vue from 'vue';

const mutations = {
  updateData(state, data) {
    Vue.set(state, 'data', data);
    state.ready = true;
  },
};

export default mutations;
