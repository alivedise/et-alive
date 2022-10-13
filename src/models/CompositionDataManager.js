export default class MachineDataManager {
  MAX_SLOT = 12;

  PREFIX = 'etac-comp-';

  constructor() {
    this.$comps = [];
    this.getList();
  }

  getList() {
    new Array(this.MAX_SLOT).fill('x').some((_, i) => {
      const machine = window.localStorage.getItem(`${this.PREFIX}${i}`);
      if (machine) {
        this.$comps.push(JSON.parse(machine));
      }
    });
  }

  clear() {
    this.$comps = [];
    new Array(this.MAX_SLOT).fill('x').some((_, i) => {
      window.localStorage.removeItem(`${this.PREFIX}${i}`);
    });
  }

  getSavingDataKey() {
    let emptyId = this.$comps.length;
    if (emptyId >= this.MAX_SLOT) {
      emptyId = this.$comps.sort((a, b) => {
        if (a.timestamp > b.timestamp) {
          return 1;
        }
        if (a.timestamp < b.timestamp) {
          return -1;
        }
        return 0;
      })[0].id;
    }
    return emptyId;
  }

  get compositions() {
    return this.$comps;
  }

  save(data) {
    let id = data.id >= 0 ? data.id : this.getSavingDataKey();
    data.id = id;
    data.timestamp = new Date().getTime();
    window.localStorage.setItem(`${this.PREFIX}${id}`, JSON.stringify(data));
    return id;
  }
}
