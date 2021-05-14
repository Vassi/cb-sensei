import { Job } from "types/Job";

export interface Action {

}

export interface SkillAction {

}

export interface ComboAction {

}

export interface TempCondition {
  Job: Job
}

export interface ActionOpener {
  name: string,
  sequenceIds: string[]
}