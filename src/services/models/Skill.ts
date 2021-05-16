import { Job } from "types/Job";

export enum SkillType {
  Ability = 4,
  Weaponskill = 3,
  Spell = 2
}

// Will need to discover these on a job by job basis.
export enum SkillResourceType {
  Mana = 3,
  Cartridge = 55,
  MchOverheat = 69,
}

export class SkillResourceRequirement {
  value: number;
  resourceType: SkillResourceType;

  constructor(value: number, resourceType: SkillResourceType) {
    this.value = value;
    this.resourceType = resourceType;
  }
}

export type SkillInfoArgs = Partial<SkillInfo>;

export interface SkillInfo {
  name: string,
  id: string,
  job: Job[],
  isOGCD: boolean,
  timer: number,
  cooldown: number,
  type: SkillType,
  requirements: SkillResourceRequirement[],
  stocks: number,
  range: number,
  preservesCombo: boolean,
  combos: boolean,
  comboSkillId?: string
};

export class Skill implements SkillInfo {
  name: string;
  id: string;
  job: Job[];
  isOGCD: boolean;
  timer: number;
  cooldown: number;
  type: SkillType;
  requirements: SkillResourceRequirement[];
  stocks: number;
  range: number;
  preservesCombo: boolean;
  combos: boolean;
  comboSkillId?: string;

  constructor(args: SkillInfo) {
    this.name = args.name;
    this.id = args.id;
    this.job = args.job;
    this.isOGCD = args.isOGCD;
    this.timer = args.timer;
    this.cooldown = args.cooldown;
    this.type = args.type;
    this.requirements = args.requirements;
    this.stocks = args.stocks;
    this.range = args.range;
    this.preservesCombo = args.preservesCombo;
    this.combos = args.combos;
    this.comboSkillId = args.comboSkillId;
  }

}