import { Skill } from './models/Skill';
import AppService from './appService';
import { autorun, makeAutoObservable, runInAction } from 'mobx';
import SkillService from './skillService';
import PlayerService from './playerService';
import { SkillArgs } from 'types/LogEvents';
import { Openers as GnbOpeners } from 'services/classes/gnb';
import { IActionSequence, ActionSequence } from 'services/models/Actions';

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

    autorun(() => {
      if (!this.app.inCombat) {
        runInAction(() => {
          this.reset();
        });
      }
    });
  }

  skillWasUsed(effect: SkillArgs) {
    //this.advanceUsingChainMethod(effect);
    this.advanceUsingOgcdMethod(effect);
  }

  advanceUsingOgcdMethod(effect: SkillArgs) {
    const matchId = effect.effectId.toUpperCase();

    if (matchId === this.pendingAction?.id.toUpperCase()) {
      this.sequence.advance(this.pendingAction);
    } else {
      const skill = this.pendingOgcds.find(ogcd => ogcd.id.toUpperCase() === matchId);
      if (skill) {
        this.sequence.advance(skill);
      }
    }
  }

  advanceUsingChainMethod(effect: SkillArgs) {
    const matchId = effect.effectId.toUpperCase();

    if (matchId === this.pendingAction?.id.toUpperCase()) {
      this.sequence.advance();
    }
  }

  gainEffect(effect: SkillArgs) {
    // Do something with this.
    //console.log('EffectGained', effect);
  }

  loseEffect(effect: SkillArgs) {
    // Do something with this.
    //console.log('Effect Lost', effect);
  }

  reset() {
    this.sequence.reset();
  }

  get currentRotation() {
    // TODO: Get rotations from somewhere
    if (this.currentJob === 'GNB') {
      return GnbOpeners[0];
    }

    return {
      name: 'Empty Opener',
      sequenceIds: []
    } as IActionSequence;
  }

  get sequence() {
    return new ActionSequence(this.currentRotation);
  }

  get pendingAction(): Skill | undefined {
    //return this.sequence.next;
    return this.sequence.nextGcd;
  }

  get previewPendingAction(): Skill | undefined {
    return this.sequence.previewNext;
  }

  get pendingOgcds(): Skill[] {
    return this.sequence.nextOgcds;
  }

  get currentJob() {
    return this.players.jobConfig?.job || 'NONE';
  }
}