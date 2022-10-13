const mutations = {
  updateSession(state, data) {
    state.session = data;
    state.manager.updateSession(data);
  },
};

export default mutations;
