import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  echos: [],
  ready: false,
};

const mach = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

export default mach;
