import { makeAutoObservable } from 'mobx';
import { Job } from 'types/Job';
import Database, { SkillMetadata } from './database';
import { IJobConfig, JobConfig } from './models/JobConfig';

export default class AppService {
  overlayLocked = false;
  gameExists = true;
  gameActive = true;
  inCombat = false;
  ready = false;

  // TODO: use innoDB or some storage to back this.
  skillsConfigured = new Map<Job, IJobConfig>();

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  async getJobConfig(job: Job, playerId: number) {
    const skillsLookup = Database.skills.where({ job: job }).toArray();
    const metadataLookup = Database.skillMeta.where({ playerId, job }).toArray();
    const [skills, metadata] = await Promise.all([skillsLookup, metadataLookup]);

    if (!skills.length) {
      return null;
    }

    const skillMap = skills.map(skill => {
      const meta = metadata.find(md => md.skillId === skill.id);
      return {
        skill,
        metadata: meta ?? new SkillMetadata({
          job: job,
          playerId,
          posX: 0,
          posY: 0,
          skillId: skill.id
        })
      }
    });

    const info = {
      skillsConfigured: skills.length === metadata.length,
      skills: skillMap,
      speed: 500 // need to save and pull this from somewhere eventually
    } as IJobConfig;

    return new JobConfig(info);
  }

  setLockedState(state: boolean) {
    this.overlayLocked = state;
  }

  setGameExists(state: boolean) {
    this.gameExists = state;
  }

  setGameActive(state: boolean) {
    this.gameActive = state;
  }

  setCombatState(state: boolean) {
    this.inCombat = state;
  }

  setReadyState(state: boolean) {
    this.ready = state;
  }
}