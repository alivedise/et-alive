const actions = {
  saveData({
    commit, rootGetters, state, rootState,
  }) {
    const session = state.manager.save({
      data: rootGetters['calculator/urldata'],
      id: state.session,
      name: rootGetters['calculator/leaders'],
      version: rootState['calculator/version'],
      attribute: rootGetters['calculator/activeAttribute'],
      preview: `${rootGetters['calculator/leaders']}/攻${rootGetters['calculator/attackBoost']}/技${
        rootGetters['calculator/skillBoost']
      }%/奧${rootGetters['calculator/skillBoost']}%`,
    });
    commit('updateSession', session);
  },
};

export default actions;
