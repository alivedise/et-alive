import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import CompositionDataManager from '@/models/CompositionDataManager';

const state = {
  manager: new CompositionDataManager(),
  session: '',
};

const composition = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

export default composition;
