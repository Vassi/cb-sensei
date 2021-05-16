import { PlayerDetail } from 'types/EventMap';
import { autorun, makeAutoObservable } from 'mobx';
import AppService from './appService';
import ModifierMap from './models/LevelModifiers';
import { JobConfig } from './models/JobConfig';

class PlayerStore {
  playerInfo: PlayerDetail | null = null;
  appService: AppService;
  jobConfig?: JobConfig;
  modMap = new ModifierMap();

  constructor(appService: AppService) {
    makeAutoObservable(this, undefined, { autoBind: true });
    this.appService = appService;

    autorun(() => {
      if (!this.appService.ready) {
        return;
      }

      this.appService.getJobConfig(this.playerInfo?.job ?? 'NONE', this.playerId ?? 0)
        .then(config => {
          if (config !== null) {
            this.setJobConfig(config);
          } else {
            this.setJobConfig();
          }
        });
    });
  }

  updatePlayerInfo(info: PlayerDetail) {
    this.playerInfo = info;
  }

  get adjustedPlayerSpeed() {
    const mods = this.modMap.getByLevel(this.level ?? 0);
    if (!mods) {
      return 0;
    }

    const speed = this.jobConfig?.speed ?? 500;
    return Math.floor(130 * (speed - mods.sub) / mods.div + 1000);
  }

  getGcd(actionDelay: number) {
    // TODO: More thorough as defined here  https://www.akhmorning.com/allagan-studies/how-to-be-a-math-wizard/shadowbringers/speed/#gcds--cast-times
    const adjustedSpeed = this.adjustedPlayerSpeed;
    const typeY = 0; // Guessing!
    const typeZ = 0; // Also guessing!
    const haste = 0; // Definitely guessing!
    const astralState = 100; // Yep.

    const mainSpd = Math.floor((2000 - adjustedSpeed) * actionDelay / 1000);
    const buffSpeedY = Math.floor((100 - typeY) * (100 - haste) / 100);
    const buffSpeedZ = (100 - typeZ) / 100;
    const buffCombined = Math.floor(Math.floor(Math.floor((buffSpeedY * buffSpeedZ)) * mainSpd / 1000) * astralState / 100);

    return buffCombined / 100;
  }

  setJobConfig(config?: JobConfig) {
    this.jobConfig = config;
  }

  get level() {
    return this.playerInfo?.level;
  }

  get mana() {
    return this.playerInfo?.currentMP;
  }

  get maxMana() {
    return this.playerInfo?.maxMP;
  }

  get job() {
    return this.playerInfo?.job;
  }

  get playerId() {
    return this.playerInfo?.id;
  }

  get jobDetail() {
    return this.playerInfo?.jobDetail;
  }
}

export default PlayerStore;