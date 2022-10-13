import Vue from 'vue';
import Vuex from 'vuex';
import calculator from './calculator';
import echo from './echo';
import mach from './mach';
import composition from './composition';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ready: false,
  },
  mutations: {
  },
  actions: {
    fetchData({ dispatch }) {
      return Promise.all([
        dispatch('mach/fetchData'),
        dispatch('echo/fetchData'),
      ]);
    },
  },
  modules: {
    calculator,
    echo,
    mach,
    composition,
  },
});
