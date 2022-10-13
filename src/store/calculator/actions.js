import lzbase62 from "lzbase62";
import ATTRIBUTES from "@/constants/attributes.json";

const actions = {
  updateActiveEcho({
    commit,
    dispatch,
    rootGetters,
  }, data) {
    commit('updateActiveEcho', data);
    dispatch('setAttributeIfNecessary', ATTRIBUTES.LIST.indexOf(rootGetters['echo/echoMapById'][data.echo.id].attribute));
  },
  updateActiveMach({
    commit,
    dispatch,
    rootGetters,
  }, data) {
    commit('updateActiveMach', data);
    dispatch('setAttributeIfNecessary', ATTRIBUTES.LIST.indexOf(rootGetters['mach/machMapById'][data.mach.id].attribute));
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
    console.log(data);
    const [ version, echo, machine, chara, attribute, hp, subEchoLimit] = data;
    console.log(hp, attribute);
    commit('updateEcho', echo);
    commit('updateMach', machine);
    commit('updateAttribute', attribute);
    commit('updateHp', hp);
    commit('updateSubEchoLimit', subEchoLimit || 0);
    /**
      data[1].forEach(([main, sub, active, tag1, tag2], index) => {
        console.log(main, sub, active, tag1, tag2);
        const pc = Object.values(this.data)[index];
        if (main[0]) {
          const mainPart = {
            ...this.partsById[+main[0]],
            machineName: this.$t(
              this.partsById[+main[0]].machineName ||
                this.partsById[+main[0]].aiName
            ),
          };
          if (mainPart) {
            pc.insert(mainPart, this.partsById);
          }
        }
        if (sub[0]) {
          const subPart = {
            ...this.partsById[+sub[0]],
            machineName: this.$t(
              this.partsById[+sub[0]].machineName ||
                this.partsById[+sub[0]].aiName
            ),
          };
          if (subPart) {
            pc.insert(subPart, this.partsById);
          }
        }
        pc.activeSubposition = +active;
        if (tag1 !== "" && TAG_DATA[tag1]?.text) {
          pc.addWordTag(TAG_DATA[tag1].text);
        }
        if (tag2 !== "" && TAG_DATA[tag2]?.text) {
          pc.addWordTag(TAG_DATA[tag2].text);
        }
      });
      this.checkIntegrated();
      this.jobGear.job = JOB_DATA[data[2][0] || 0].text;
      this.jobGear.level = data[2][1];
      this.wordTagGear.tag = data[3][0] !== "" ? TAG_DATA[data[3][0]].text : "";
      this.wordTagGear.level = data[3][1];
      this.transformGear.type = TRANSFORM_GEAR_DATA[data[4][0]].text;
      this.transformGear.level = data[4][1];
      this.parameterGear.type = PARAMETER_GEAR_DATA[data[5][0]].text;
      this.parameterGear.level = data[5][1];
      this.conditionMap.type =
        data[7][0] !== ""
          ? CONDITION_ATTACK_TYPE_DATA[+data[7][0]]?.text || ""
          : "";
      // DEPRECATED
      this.conditionMap.category = "";
      this.conditionMap.environment =
        data[7][2] !== ""
          ? CONDITION_ENVIRONMENT_DATA[+data[7][2]]?.text || ""
          : "";
      this.conditionMap.team =
        data[7][3] !== "" ? CONDITION_TEAM_DATA[+data[7][3]]?.text || "" : "";
      this.conditionMap.counter =
        data[7][4] !== ""
          ? CONDITION_COUNTER_DATA[+data[7][4]]?.text || ""
          : "";
      this.conditionMap.operate =
        data[7][5] !== ""
          ? CONDITION_OPERATE_DATA[+data[7][5]]?.text || ""
          : "";
      this.conditionMap.short_weapon =
        data[7][6] !== ""
          ? CONDITION_CATEGORY_DATA[+data[7][6]]?.text || ""
          : "";
      this.conditionMap.long_weapon =
        data[7][7] !== ""
          ? CONDITION_CATEGORY_DATA[+data[7][7]]?.text || ""
          : "";
      this.machineName = data[8] || '';
      this.updateConditionCandidates();
      */
  },
};

export default actions;
