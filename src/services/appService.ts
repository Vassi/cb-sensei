import { makeAutoObservable } from 'mobx';
import { Job } from 'types/Job';

export type JobConfig = {
  skillsConfigured: boolean,
  speed: number,
  level: number
};

const jobConfigDefaults: JobConfig = {
  skillsConfigured: false,
  speed: 300,
  level: 80
};

export default class AppService {
  overlayLocked = false;
  gameExists = true;
  gameActive = true;
  inCombat = false;

  // TODO: use innoDB or some storage to back this.
  skillsConfigured = new Map<Job, JobConfig>();

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  getJobConfig(job: Job) {
    return this.skillsConfigured.get(job) ?? jobConfigDefaults;
  }

  setJobConfig(job: Job, config: JobConfig) {
    this.skillsConfigured.set(job, config);
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
}