export default class Echo {
  constructor(raw) {
    this.update(raw || ['', '', '', '']);
  }

  update(raw) {
    this.raw = raw;
    this.id = +raw[0];
    this.skillLevel = +raw[1];
    this.level = +raw[2];
    this.bonusLevel = +raw[3];
  }

  get isEmpty() {
    return this.raw[0].length;
  }
}
