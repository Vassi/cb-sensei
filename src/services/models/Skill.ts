import { Job } from "types/Job";

export type SkillType = 'Ability' | 'Weaponskill' | 'Spell';
export type SkillResourceType = 'Mana' | 'Cartridge' | 'Buff';

export class SkillResourceRequirement {
  value: number;
  resourceType: SkillResourceType;

  constructor(value: number, resourceType: SkillResourceType) {
    this.value = value;
    this.resourceType = resourceType;
  }
}

export type SkillInfoArgs = {
  name: string,
  id: string,
  job: Job[],
  isOGCD?: boolean,
  timer?: number,
  cooldown?: number,
  type?: SkillType,
  requirements?: SkillResourceRequirement[],
  stocks?: number,
};

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
};

const gcdTime = 2500;
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

  constructor(args: SkillInfoArgs) {
    this.name = args.name;
    this.id = args.id;
    this.job = args.job;
    this.isOGCD = args.isOGCD ?? true;
    this.timer = args.timer ?? gcdTime;
    this.cooldown = args.cooldown ?? 0;
    this.type = args.type ?? 'Weaponskill';
    this.requirements = args.requirements ?? [];
    this.stocks = args.stocks ?? 1;
  }

}