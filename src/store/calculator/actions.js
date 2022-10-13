import lzbase62 from "lzbase62";
import ATTRIBUTES from "@/constants/attributes";

const actions = {
  updateActiveEcho({
    commit,
    dispatch,
    rootGetters,
  }, data) {
    commit('updateActiveEcho', data);
    dispatch('setAttributeIfNecessary', ATTRIBUTES.getIndex(rootGetters['echo/echoMapById'][data.echo.id].attribute));
  },
  updateActiveMach({
    commit,
    dispatch,
    rootGetters,
  }, data) {
    commit('updateActiveMach', data);
    dispatch('setAttributeIfNecessary', ATTRIBUTES.getIndex(rootGetters['mach/machMapById'][data.mach.id].attribute));
  },
  setAttributeIfNecessary({
    commit,
    state,
  }, data) {
    if (state.attribute === -1 || state.attribute === '') {
      commit('updateAttribute', data);
    }
  },
  loadData({
    commit,
  }, data) {
    data = JSON.parse(lzbase62.decompress(data));
    const [ version, echo, machine, chara, attribute, hp, subEchoLimit] = data;
    commit('updateEcho', echo);
    commit('updateMach', machine);
    commit('updateAttribute', attribute);
    commit('updateHp', hp);
    commit('updateSubEchoLimit', subEchoLimit || 0);
  },
};

export default actions;
