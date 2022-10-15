const mutations = {
  updateActiveEcho(state, { index, echo }) {
    state.echo[index].id = +echo.id;
  },
  updateActiveMach(state, { index, mach }) {
    state.mach[index].id = +mach.id;
  },
  updateEcho(state, echo) {
    state.echo.forEach((e, i) => {
      if (!echo[i]) {
        return;
      }
      e.update(echo[i]);
    });
  },
  clearExistingGodPrisonEcho(state, map) {
    state.echo.forEach((e) => {
      if (!e.id) {
        return;
      }
      const d = map[e.id];
      if (!d) {
        return;
      }
      if (d.series.indexOf('天司') >= 0) {
        e.update([0, 0, 0, 0, 0, 0]);
      }
    });
  },
  updateMach(state, data) {
    state.mach.forEach((e, i) => e.update(data[i]));
  },
  updateAttribute(state, data) {
    state.attribute = data;
  },
  updateHp(state, data) {
    state.hp = data;
  },
  updateSubEchoLimit(state, data) {
    state.subEchoLimit = data;
  },
};

export default mutations;
