import { Job } from 'types/Job';

export interface ISkillMetadata {
  id?: string;
  playerId: number;
  job: Job;
  skillId: string;
  posX: number;
  posY: number;
}

export class SkillMetadata implements ISkillMetadata {
  id?: string;
  playerId: number;
  job: Job;
  skillId: string;
  posX: number;
  posY: number;

  constructor(args: ISkillMetadata) {
    this.id = args.id;
    this.playerId = args.playerId;
    this.job = args.job;
    this.skillId = args.skillId;
    this.posX = args.posX;
    this.posY = args.posY;
  }
}