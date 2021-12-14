import Part from '@/models/Part';

export default class PartCombinator {
  constructor(position) {
    this.position = position;
    this.parts = [
      new Part(null, 'main'),
      new Part(null, 'sub'),
    ];
    this.activeSubposition = 0;
    this.activeWordTags = [];
  }

  get isEmpty() {
    return this.parts[0].isEmpty;
  }

  addWordTag(tag) {
    if (this.activeWordTags.length === 2) {
      this.activeWordTags.shift();
    }
    this.activeWordTags.push(tag);
  }

  toggleActivation() {
    if (this.activeSubposition === 0) {
      this.activeSubposition = 1;
    } else {
      this.activeSubposition = 0;
    }
  }

  get wordTags() {
    return [this.main.wordTag1, this.main.wordTag2, this.sub.wordTag1, this.sub.wordTag2].filter((d) => d !== '');
  }

  insert(part) {
    if (this.parts[0].isEmpty) {
      this.main = part;
      this.activeWordTags = [part.wordTag1, part.wordTag2];
    } else if (this.parts[1].isEmpty) {
      this.sub = part;
    }
  }

  get main() {
    return this.parts[0];
  }

  get sub() {
    return this.parts[1];
  }

  set main(partConfig) {
    this.parts[0].updatePart(partConfig);
  }

  set sub(partConfig) {
    this.parts[1].updatePart(partConfig);
  }

  get activePart() {
    return this.parts[this.activeSubposition];
  }

  get boostAmount() {
    if (this.parts[0].isEmpty) {
      return 0;
    }
    return this.parts[this.activeSubposition].boostAmount;
  }

  get buffBoostAmount() {
    if (this.parts[0].isEmpty) {
      return 0;
    }
    return this.parts[this.activeSubposition].buffBoostAmount;
  }

  get activePassive1() {
    return this.parts[this.activeSubposition].passive1;
  }

  get activePassive2() {
    return this.parts[this.activeSubposition].passive2;
  }

  get meleeAttack() {
    return this.parts[0].meleeAttack + (this.parts[1].meleeAttack * this.parts[1].calculateSubBonus(this.parts[0]));
  }

  get rangeAttack() {
    return this.parts[0].rangeAttack + (this.parts[1].rangeAttack * this.parts[1].calculateSubBonus(this.parts[0]));
  }

  get meleeDefense() {
    return this.parts[0].meleeDefense + (this.parts[1].meleeDefense * this.parts[1].calculateSubBonus(this.parts[0]));
  }

  get rangeDefense() {
    return this.parts[0].rangeDefense + (this.parts[1].rangeDefense * this.parts[1].calculateSubBonus(this.parts[0]));
  }

  get physicalResistence() {
    return this.parts[0].physicalResistence + (this.parts[1].physicalResistence * this.parts[1].calculateSubBonus(this.parts[0]));
  }

  get beamResistence() {
    return this.parts[0].beamResistence + (this.parts[1].beamResistence * this.parts[1].calculateSubBonus(this.parts[0]));
  }

  get armor() {
    return this.parts[0].armor + (this.parts[1].armor * this.parts[1].calculateSubBonus(this.parts[0]));
  }

  removePart() {
    this.parts = [
      new Part(null, 'main'),
      new Part(null, 'sub'),
    ];
  }
}