const mutations = {
  updateActiveEcho(state, { index, echo }) {
    state.echo[index].id = +echo.id;
  },
  updateActiveMach(state, { index, mach }) {
    state.mach[index].id = +mach.id;
  },
  updateEcho(state, echo) {
    state.echo.forEach((e, i) => e.update(echo[i][0]));
  },
  updateMach(state, data) {
    state.mach.forEach((e, i) => e.update(data[i][0]));
  },
  updateAttribute(state, data) {
    state.attribute = data;
  },
  updateHp(state, data) {
    state.hp = data;
  },
};

export default mutations;
