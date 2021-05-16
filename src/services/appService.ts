import { makeAutoObservable } from 'mobx';
import { Job } from 'types/Job';
import { GlobalConfig } from './models/GlobalConfig';
import { JobConfig } from './models/JobConfig';

export default class AppService {
  gameExists = true;
  gameActive = true;
  inCombat = false;
  ready = false;
  config: GlobalConfig;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });

    this.config = new GlobalConfig({ locked: false });
  }

  async getJobConfig(job: Job, playerId: number) {
    return await JobConfig.get(playerId, job);
  }

  async initialize() {
    const config = await GlobalConfig.get();

    if (config) {
      this.config = config;
    }
  }

  setLockedState(state: boolean) {
    this.config.locked = state;
    this.config.save();
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

  get overlayLocked() {
    return this.config.locked;
  }

  get overlayActive() {
    return this.gameExists && this.gameActive && this.ready;
  }
}