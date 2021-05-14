import { PlayerDetail } from "./EventMap";

export type LogEventType = 'SkillUsed' | 'EffectGained' | 'EffectLost';

export type LogEvent = {
  type: LogEventType,
  args: SkillArgs | PlayerDetail
}

export type SkillArgs = {
  timestamp: string,
  timeUsed: Date,
  effectId: string,
  effectName: string,
  casterId: string,
  casterName: string,
  targetId: string,
  targetName: string,
  duration: number
}

export type GameStateArgs = {
  gameExists: boolean,

}