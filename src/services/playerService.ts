import { PlayerDetail } from 'types/EventMap';
import { makeAutoObservable } from 'mobx';
import AppService from './appService';
import ModifierMap from './models/LevelModifiers';

class PlayerStore {
  playerInfo: PlayerDetail | null = null;
  appService: AppService;
  modMap = new ModifierMap();

  constructor(appService: AppService) {
    makeAutoObservable(this, undefined, { autoBind: true });
    this.appService = appService;
  }

  updatePlayerInfo(info: PlayerDetail) {
    this.playerInfo = info;
  }

  get adjustedPlayerSpeed() {
    const mods = this.modMap.getByLevel(this.level ?? 0);
    if (!mods) {
      return 0;
    }

    return Math.floor(130 * (this.jobConfig.speed - mods.sub) / mods.div + 1000);
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

  get jobConfig() {
    return this.appService.getJobConfig(this.playerInfo?.job ?? 'NONE');
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

  get jobDetail() {
    return this.playerInfo?.jobDetail;
  }
}

export default PlayerStore;