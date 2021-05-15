import { OnGameActiveChangedEventArgs, OnGameExistsEventArgs, OnInCombatChangedEventArgs, PlayerDetail } from "./EventMap";

export enum LogEventTypes {
  SkillUsed = 'SkillUsed',
  EffectGained = 'EffectGained',
  EffectLost = 'EffectLost',
  PlayerUpdate = 'PlayerUpdate',
  InCombatUpdate = 'InCombatUpdate',
  GameExistsUpdate = 'GameExistsUpdate',
  GameActiveUpdate = 'GameUpdateUpdate',
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

export type LogEvent = {
  type: LogEventTypes.SkillUsed | LogEventTypes.EffectGained | LogEventTypes.EffectLost,
  args: SkillArgs,
} | {
  type: LogEventTypes.PlayerUpdate,
  args: PlayerDetail,
} | {
  type: LogEventTypes.InCombatUpdate,
  args: OnInCombatChangedEventArgs,
} | {
  type: LogEventTypes.GameActiveUpdate,
  args: OnGameActiveChangedEventArgs,
} | {
  type: LogEventTypes.GameExistsUpdate,
  args: OnGameExistsEventArgs
};