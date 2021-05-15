import { Skill } from './models/Skill';
import AppService from './appService';
import { makeAutoObservable } from 'mobx';
import SkillService from './skillService';
import PlayerService from './playerService';
import { SkillArgs } from 'types/LogEvents';

export default class RotationService {
  skillsById: Map<string, Skill> = new Map<string, Skill>();
  app: AppService;
  skills: SkillService;
  players: PlayerService;

  constructor(appService: AppService, skillService: SkillService, playerService: PlayerService) {
    makeAutoObservable(this, undefined, { autoBind: true });
    this.app = appService;
    this.skills = skillService;
    this.players = playerService;
  }

  skillWasUsed(effect: SkillArgs) {
    // Do something with this.
    console.log('SkillUsed', effect);
  }

  gainEffect(effect: SkillArgs) {
    // Do something with this.
    console.log('EffectGained', effect);
  }

  loseEffect(effect: SkillArgs) {
    // Do something with this.
    console.log('Effect Lost', effect);
  }
}