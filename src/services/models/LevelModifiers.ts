export class LevelModifiers {
  mp: number;
  main: number;
  sub: number;
  div: number;
  hp: number;
  elmt: number;
  threat: number;

  constructor(mp: number, main: number, sub: number, div: number, hp: number, elmt: number, threat: number) {
    this.mp = mp;
    this.main = main;
    this.sub = sub;
    this.div = div;
    this.hp = hp;
    this.elmt = elmt;
    this.threat = threat;
  }
}

export default class LevelModifierTable {
  modifiersByLevel = new Map<number, LevelModifiers>();

  constructor() {
    // TODO: More tables defined here: https://www.akhmorning.com/allagan-studies/modifiers/levelmods/
    this.modifiersByLevel.set(80, new LevelModifiers(10000, 340, 380, 3300, 4400, 1, 569));
  }

  getByLevel(level: number) {
    // Maybe some day I will want to support different level rotations.
    return this.modifiersByLevel.get(level) ?? this.modifiersByLevel.get(80);
  }
}