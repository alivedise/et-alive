import lzbase62 from 'lzbase62';
import { tify } from 'chinese-conv';
import ATTRIBUTES from '@/constants/attributes.js';

const theGetters = {
  constHp(state, getters, rootState, rootGetters) {
    return state.echo.reduce((acc, obj) => { return acc + +rootGetters['echo/echoMapById'][obj.id]?.hp || 0; }, 0);
  },
  constAttack(state, getters, rootState, rootGetters) {
    return state.echo.reduce((acc, obj) => { return acc + +rootGetters['echo/echoMapById'][obj.id]?.attack || 0; }, 0);
  },
  machBoost(state, getters, rootState, rootGetters) {
    const result = {
      titan: 1,
      greece: 1,
      star: 1,
      attribute: 0,
    };
    if (getters.main) {
      if (tify(getters.main.system) === '泰坦') {
        result.titan = result.titan + 0.9;
      } else if (tify(getters.main.system) === '諸神') {
        if (tify(getters.main.name).indexOf('殘影') >= 0) {
          result.greece = result.greece + 1;
        } else {
          result.greece = result.greece + 1.1;
        }
      }
    }
    if (getters.support) {
      if (tify(getters.support.system) === '泰坦') {
        result.titan = result.titan + 0.9;
      } else if (tify(getters.support.system) === '諸神') {
        if (tify(getters.support.name).indexOf('殘影') >= 0) {
          result.greece = result.greece + 1;
        } else {
          result.greece = result.greece + 1.1;
        }
      }
    }
    return result;
  },
  attackBoost(state, getters, rootState, rootGetters) {
    return Math.round(100 * getters.titanAttackBoost
      * getters.greeceAttackBoost
      * getters.attributeBoost
      * getters.starAttackBoost);
  },
  daBoost(state, getters, rootState, rootGetters) {
    return Math.round(100 * state.echo.reduce(
      (acc, obj) => {
        const echo = rootGetters['echo/echoMapById'][obj.id];
        if (echo && state.attribute === ATTRIBUTES.getIndex(echo.attribute)) {
          return acc
            + getters.machBoost.titan * echo.data.titan.da
            + getters.machBoost.greece * echo.data.greece.da
            + getters.machBoost.star * echo.data.star.da;
        }
        return acc;
      },
      0,
    ));
  },
  taBoost(state, getters, rootState, rootGetters) {
    return Math.round(100 * state.echo.reduce(
      (acc, obj) => {
        const echo = rootGetters['echo/echoMapById'][obj.id];
        if (echo && state.attribute === ATTRIBUTES.getIndex(echo.attribute)) {
          return acc
            + getters.machBoost.titan * echo.data.titan.ta
            + getters.machBoost.greece * echo.data.greece.ta
            + getters.machBoost.star * echo.data.star.ta;
        }
        return acc;
      },
      0,
    ));
  },
  skillLimitBoost(state, getters, rootState, rootGetters) {
    return Math.round(100 * state.echo.reduce(
      (acc, obj) => {
        const echo = rootGetters['echo/echoMapById'][obj.id];
        if (echo && state.attribute === ATTRIBUTES.getIndex(echo.attribute)) {
          return acc
            + getters.machBoost.titan * echo.data.titan.skilldl
            + getters.machBoost.greece * echo.data.greece.skilldl
            + getters.machBoost.star * echo.data.star.skilldl;
        }
        return acc;
      },
      0,
    ));
  },
  burstLimitBoost(state, getters, rootState, rootGetters) {
    return Math.round(100 * state.echo.reduce(
      (acc, obj) => {
        const echo = rootGetters['echo/echoMapById'][obj.id];
        if (echo && state.attribute === ATTRIBUTES.getIndex(echo.attribute)) {
          return acc
            + getters.machBoost.titan * echo.data.titan.burstdl
            + getters.machBoost.greece * echo.data.greece.burstdl
            + getters.machBoost.star * echo.data.star.burstdl;
        }
        return acc;
      },
      0,
    ));
  },
  calmBoost(state, getters, rootState, rootGetters) {
    return Math.round(100 * state.echo.reduce(
      (acc, obj) => {
        const echo = rootGetters['echo/echoMapById'][obj.id];
        if (echo && state.attribute === ATTRIBUTES.getIndex(echo.attribute)) {
          return acc
            + getters.machBoost.titan * echo.data.titan.calm
            + getters.machBoost.greece * echo.data.greece.calm
            + getters.machBoost.star * echo.data.star.calm;
        }
        return acc;
      },
      0,
    ));
  },
  backwaterBoost(state, getters, rootState, rootGetters) {
    return Math.round(100 * state.echo.reduce(
      (acc, obj) => {
        const echo = rootGetters['echo/echoMapById'][obj.id];
        if (echo && state.attribute === ATTRIBUTES.getIndex(echo.attribute)) {
          return acc
            + getters.machBoost.titan * echo.data.titan.backwater
            + getters.machBoost.greece * echo.data.greece.backwater
            + getters.machBoost.star * echo.data.star.backwater;
        }
        return acc;
      },
      0,
    ));
  },
  titanAttackBoost(state, getters, rootState, rootGetters) {
    return state.echo.reduce(
      (acc, obj) => {
        const echo = rootGetters['echo/echoMapById'][obj.id];
        if (echo && state.attribute === ATTRIBUTES.getIndex(echo.attribute)) {
          return acc + getters.machBoost.titan * echo.data.titan.attack;
        }
        return acc;
      },
      1,
    );
  },
  greeceAttackBoost(state, getters, rootState, rootGetters) {
    return state.echo.reduce(
      (acc, obj) => {
        const echo = rootGetters['echo/echoMapById'][obj.id];
        if (echo && state.attribute === ATTRIBUTES.getIndex(echo.attribute)) {
          return acc + getters.machBoost.greece * echo.data.greece.attack;
        }
        return acc;
      },
      1,
    );
  },
  starAttackBoost(state, getters, rootState, rootGetters) {
    return state.echo.reduce(
      (acc, obj) => {
        const echo = rootGetters['echo/echoMapById'][obj.id];
        if (echo && state.attribute === ATTRIBUTES.getIndex(echo.attribute)) {
          return acc + echo.data.star.attack;
        }
        return acc;
      },
      1,
    );
  },
  skillBoost(state, getters, rootState, rootGetters) {
    return Math.round(100 * getters.titanSkillBoost
      * getters.greeceSkillBoost
      * getters.attributeBoost
      * getters.starSkillBoost);
  },
  titanSkillBoost(state, getters, rootState, rootGetters) {
    return state.echo.reduce(
      (acc, obj) => {
        const echo = rootGetters['echo/echoMapById'][obj.id];
        if (echo && state.attribute === ATTRIBUTES.getIndex(echo.attribute)) {
          return acc + getters.machBoost.titan * echo.data.titan.skilld;
        }
        return acc;
      },
      1,
    );
  },
  greeceSkillBoost(state, getters, rootState, rootGetters) {
    return state.echo.reduce(
      (acc, obj) => {
        const echo = rootGetters['echo/echoMapById'][obj.id];
        if (echo && state.attribute === ATTRIBUTES.getIndex(echo.attribute)) {
          return acc + getters.machBoost.greece * echo.data.greece.skilld;
        }
        return acc;
      },
      1,
    );
  },
  starSkillBoost(state, getters, rootState, rootGetters) {
    return state.echo.reduce(
      (acc, obj) => {
        const echo = rootGetters['echo/echoMapById'][obj.id];
        if (echo && state.attribute === ATTRIBUTES.getIndex(echo.attribute)) {
          return acc + echo.data.star.skilld;
        }
        return acc;
      },
      1,
    );
  },
  burstBoost(state, getters, rootState, rootGetters) {
    return Math.round(100 * getters.titanBurstBoost
      * getters.greeceBurstBoost
      * getters.attributeBoost
      * getters.starBurstBoost);
  },
  titanBurstBoost(state, getters, rootState, rootGetters) {
    return state.echo.reduce(
      (acc, obj) => {
        const echo = rootGetters['echo/echoMapById'][obj.id];
        if (echo && state.attribute === ATTRIBUTES.getIndex(echo.attribute)) {
          return acc + getters.machBoost.titan * echo.data.titan.burstd;
        }
        return acc;
      },
      1,
    );
  },
  greeceBurstBoost(state, getters, rootState, rootGetters) {
    return state.echo.reduce(
      (acc, obj) => {
        const echo = rootGetters['echo/echoMapById'][obj.id];
        if (echo && state.attribute === ATTRIBUTES.getIndex(echo.attribute)) {
          return acc + getters.machBoost.greece * echo.data.greece.burstd;
        }
        return acc;
      },
      1,
    );
  },
  starBurstBoost(state, getters, rootState, rootGetters) {
    return state.echo.reduce(
      (acc, obj) => {
        const echo = rootGetters['echo/echoMapById'][obj.id];
        if (echo && state.attribute === ATTRIBUTES.getIndex(echo.attribute)) {
          return acc + echo.data.star.burstd;
        }
        return acc;
      },
      1,
    );
  },
  attributeBoost(state, getters) {
    return 1 * (1 + getters.machBoost.attribute);
  },
  main(state, getters, rootState, rootGetters) {
    return getters.machList[0];
  },
  support(state, getters, rootState, rootGetters) {
    return getters.machList[1];
  },
  machList(state, getters, rootState, rootGetters) {
    return state.mach.map((m) => rootGetters['mach/machMapById'][+m.id] || '');
  },
  leaders(state, getters, rootState, rootGetters) {
    return `${getters.main ? getters.main.nick : '-'}-${getters.support ? getters.support.nick : '-'}`;
  },
  guessAttributeColor(state) {
    if (state.attribute === -1 || state.attribute === '') {
      return '';
    }
    return ATTRIBUTES[ATTRIBUTES.LIST[state.attribute]]?.color;
  },
  urldata(state) {
    const rows = Object.values(state.echo).map((p) => {
      return [
        [p.id, p.skillLevel, p.level, p.bonusLevel],
        // id, skill level, echo level, bonus level,
      ];
    });
    const rowsMach = Object.values(state.mach).map((p) => {
      return [
        [p.id, p.limitLevel],
        // id, skill level, echo level, bonus level,
      ];
    });
    const data = [
      1, // data versioning
      rows, // echo data
      rowsMach, // machine data
      [], // chara data
      state.attribute || -1,
      state.hp || 100,
    ];
    return lzbase62.compress(JSON.stringify(data));
  },
};
export default theGetters;
