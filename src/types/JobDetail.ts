// Adapted from https://github.com/quisquous/cactbot/blob/main/types/event.d.ts

export interface JobDetail {
  'PLD': { oath: number };
  'WAR': { beast: number };
  'DRK': {
    blood: number;
    darksideMilliseconds: number;
    darkArts: 1 | 0;
    livingShadowMilliseconds: number;
  };
  'GNB': {
    cartridges: number;
    continuationState: string;
  };
  'WHM': {
    lilyStacks: number;
    lilyMilliseconds: number;
    bloodlilyStacks: number;
  };
  'SCH': {
    aetherflowStacks: number;
    fairyGauge: number;
    fairyMilliseconds: number;
    fairyStatus: number;
  };
  'AST': {
    heldCard: 'Balance' | 'Bole' | 'Arrow' | 'Spear' | 'Ewer' | 'Spire';
    arcanums: string;
  };
  'PGL': {
    lightningMilliseconds: number;
    lightningStacks: number;
  };
  'MNK': {
    lightningStacks: number;
    lightningMilliseconds: number;
    chakraStacks: number;
    lightningTimerFrozen: boolean;
  };
  'DRG': {
    eyesAmount: number;
    bloodMilliseconds: number;
    lifeMilliseconds: number;
  };
  'NIN': {
    hutonMilliseconds: number;
    ninkiAmount: number;
  };
  'SAM': {
    kenki: number;
    meditationStacks: number;
    setsu: boolean;
    getsu: boolean;
    ka: boolean;
  };
  'BRD': {
    songName: 'Ballad' | 'Paeon' | 'Minuet' | 'None';
    songMilliseconds: number;
    songProcs: number;
    soulGauge: number;
  };
  'MCH': {
    overheatMilliseconds: number;
    batteryMilliseconds: number;
    heat: number;
    battery: number;
    lastBatteryAmount: number;
    overheatActive: boolean;
    robotActive: boolean;
  };
  'DNC': {
    feathers: number;
    esprit: number;
    currentStep: number;
    steps: string;
  };
  'THM': {
    umbralMilliseconds: number;
    umbralStacks: number;
  };
  'BLM': {
    umbralMilliseconds: number;
    umbralStacks: number;
    enochian: boolean;
    umbralHearts: number;
    foulCount: number;
    nextPolyglotMilliseconds: number;
  };
  'ACN': {
    aetherflowStacks: number;
  };
  'SMN': {
    stanceMilliseconds: number;
    bahamutStance: 5 | 0;
    bahamutSummoned: 1 | 0;
    aetherflowStacks: number;
    dreadwyrmStacks: number;
    phoenixReady: number;
  };
  'RDM': {
    whiteMana: number;
    blackMana: number;
  };
};
