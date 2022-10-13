import { tify } from 'chinese-conv';
const LIST = ['水', '火', '風', '土', '光', '暗'];
function getIndex(val) {
  if (Number.isInteger(val)) {
    return val;
  }
  if (val === '地') {
    val = '土';
  }
  return LIST.indexOf(tify(val));
}

export default {
  LIST,
  水: {
    color: 'blue',
    'background-color': 'rgba(0, 0, 255, 0.3)',
  },
  火: {
    color: 'red',
    'background-color': 'rgba(0, 0, 255, 0.3)',
  },
  風: {
    color: 'green',
    'background-color': 'rgba(0, 0, 255, 0.3)',
  },
  土: {
    color: 'brown',
    'background-color': 'rgba(0, 0, 255, 0.3)',
  },
  光: {
    color: 'yellow',
    'background-color': 'rgba(0, 0, 255, 0.3)',
  },
  暗: {
    color: 'purple',
    'background-color': 'rgba(0, 0, 255, 0.3)',
  },
  getIndex,
};
