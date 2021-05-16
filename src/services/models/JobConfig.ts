import { makeAutoObservable } from "mobx";
import { SkillMetadata } from "services/database";
import { Skill } from "./Skill";

export interface IJobConfig {
  skillsConfigured: boolean,
  speed: number,
  skills: SkillTuple[]
};

export class JobConfig implements IJobConfig {
  skillsConfigured: boolean;
  speed: number;
  skills: SkillTuple[];

  constructor(args: IJobConfig) {
    makeAutoObservable(this, undefined, { autoBind: true });

    this.skills = args.skills;
    this.skillsConfigured = args.skillsConfigured;
    this.speed = args.speed;
  }

  setSkillsConfigured(state: boolean) {
    this.skillsConfigured = state;
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }
}

export type SkillTuple = {
  skill: Skill,
  metadata: SkillMetadata
};