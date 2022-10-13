import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  data: [],
  ready: false,
};

const echo = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

export default echo;
