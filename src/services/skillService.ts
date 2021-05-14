import { Skill } from './models/Skill';
import { Skills } from './classes';
import AppService from './appService';
import { makeAutoObservable } from 'mobx';

export default class SkillService {
  skillsById: Map<string, Skill> = new Map<string, Skill>();
  appService: AppService;

  constructor(appService: AppService) {
    makeAutoObservable(this, undefined, { autoBind: true });
    this.appService = appService;

    Skills.forEach(sk => {
      this.skillsById.set(sk.id, new Skill(sk));
    })
  }
}