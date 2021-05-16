import { makeAutoObservable } from "mobx";
import { Job } from "types/Job";
import Database from 'services/database';
import { Skill } from "./Skill";

export interface Action {

}

export interface SkillAction {

}

export interface ComboAction {

}

export interface TempCondition {
  Job: Job
}

export interface IActionSequence {
  name: string,
  sequenceIds: string[]
}

export class ActionSequence {
  sequence: IActionSequence;
  skillSequence: Skill[] = [];
  skillQueue: Skill[] = [];
  ready = false;

  constructor(sequence: IActionSequence) {
    makeAutoObservable(this, undefined, { autoBind: true });
    this.sequence = sequence;

    Database.skills.bulkGet(sequence.sequenceIds).then((skills) => {
      this.initialize(skills);
    });
  }

  initialize(skills: Array<Skill | undefined>) {
    this.sequence.sequenceIds.forEach((skillId) => {
      const skill = skills.find(sk => sk?.id === skillId);
      if (skill) {
        this.skillSequence.push(skill);
      }
    })

    this.reset();
    this.ready = true;
  }

  reset() {
    this.skillQueue = [...this.skillSequence];
  }

  advance(skill?: Skill) {
    if (skill) {
      const index = this.skillQueue.indexOf(skill);
      this.skillQueue.splice(index, 1);
    } else {
      this.skillQueue.shift();
    }
  }

  get next() {
    if (this.skillQueue.length) {
      return this.skillQueue[0];
    }

    return undefined;
  }

  get previewNext() {
    if (this.skillQueue.length > 1) {
      return this.skillQueue[1];
    }

    return undefined;
  }

  get nextGcd() {
    if (this.skillQueue.length) {
      return this.skillQueue.find(sk => !sk.isOGCD);
    }

    return undefined;
  }

  get nextOgcds() {
    const ogcds: Skill[] = [];

    for (let i = 0; i < this.skillQueue.length; i++) {
      const skill = this.skillQueue[i];
      if (!skill.isOGCD) {
        break;
      }

      ogcds.push(skill);
    }
    return ogcds;
  }
}