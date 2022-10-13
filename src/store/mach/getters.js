const theGetters = {
  machMapById(state) {
    const map = {};
    state.data.forEach((e) => {
      map[e.id] = e;
    });
    return map;
  },
};
export default theGetters;
