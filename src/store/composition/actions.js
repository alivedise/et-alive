const actions = {
  saveCurrentData({
    commit, rootGetters, state,
  }) {
    window.localStorage.setItem("gbmac-latest-data", rootGetters['calculator/urldata']);
    commit('updateSession', state.manager.save({
      data: rootGetters['calculator/urldata'],
      id: state.session,
      name: rootGetters['calculator/leaders'],
      preview: `${rootGetters['calculator/leaders']}/攻${rootGetters['calculator/attackBoost']}/技${
        rootGetters['calculator/skillBoost']
      }%/奧${rootGetters['calculator/skillBoost']}%`,
    }));
    window.localStorage.setItem("gbmac-latest-id", state.session);
  },
};

export default actions;
