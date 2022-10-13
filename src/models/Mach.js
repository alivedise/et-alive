export default class Mach {
  constructor(raw) {
    this.update(raw || ['', '']);
  }

  update(raw) {
    this.raw = raw;
    this.id = +raw[0];
    this.limitLevel = +raw[1];
  }

  get isEmpty() {
    return this.raw[0].length;
  }
}
