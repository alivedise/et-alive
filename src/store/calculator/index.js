import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import Echo from '@/models/Echo';
import Mach from '@/models/Mach';
import ECHOLIMIT from '@/constants/echoLimit';

function generateEcho() {
  return new Array(13).fill('').map(() => new Echo());
}

function generateMachine() {
  return new Array(5).fill('').map(() => new Mach());
}

function generateChara() {
  return new Array(10).fill('').map(() => new Echo());
}

const state = {
  version: 1,
  attribute: -1,
  echo: generateEcho(),
  mach: generateMachine(),
  chara: [],
  hp: 100,
  subEchoLimit: 0,
  subMachLimit: 3,
};

const calculator = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

export default calculator;
