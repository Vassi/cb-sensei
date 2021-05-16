import { makeAutoObservable } from "mobx";
import { Job } from "types/Job";
import { Skill } from "./Skill";
import { SkillMetadata } from "./SkillMetadata";
import Database from 'services/database';

export interface IJobConfig {
  id?: string;
  playerId: number;
  job: Job;
  skillsConfigured: boolean,
  speed: number,
  skills: SkillTuple[]
};

export type SkillTuple = {
  skill: Skill,
  metadata: SkillMetadata
};

export class JobConfig implements IJobConfig {
  id?: string;
  playerId: number;
  job: Job;
  skillsConfigured: boolean;
  speed: number;
  skills: SkillTuple[];

  constructor(args: IJobConfig) {
    makeAutoObservable(this, undefined, { autoBind: true });

    this.skills = args.skills;
    this.job = args.job;
    this.skillsConfigured = args.skillsConfigured;
    this.speed = args.speed;
    this.playerId = args.playerId;
  }

  setSkillsConfigured(state: boolean) {
    this.skillsConfigured = state;
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  setSkillTuple(skills: SkillTuple[]) {
    this.skills = skills;
  }

  async save() {
    return Database.jobConfig.put(this, this.id);
  }

  static async get(playerId: number, job: Job) {
    let config = await Database.jobConfig.get({ job, playerId });
    if (!config) {
      config = new JobConfig({
        skillsConfigured: false,
        playerId,
        job,
        speed: 500,
        skills: []
      });

      const skills = await Database.skills.where({ job: job }).toArray();
      const skillMap = skills.map(skill => {
        return {
          skill,
          metadata: new SkillMetadata({
            job: job,
            playerId,
            posX: 0,
            posY: 0,
            skillId: skill.id
          })
        }
      });

      config.setSkillTuple(skillMap);
    }

    return config;
  }
}

