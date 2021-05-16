import { ActionOpener } from 'services/models/Actions';

export enum GnbSkills {
  KeenEdge = '3f09',
  BrutalShell = '3f0b',
  SolidBarrel = '3f11',
  DemonSlice = '3f0d',
  DemonSlaughter = '3f15',
  FatedCircle = '3f0d',
  SonicBreak = '3f19',
  LightningShot = '3f0f',
  GnashingFang = '3f12',
  SavageClaw = '3f13',
  WickedTalon = '3f16',
  JugularRip = '3f1c',
  AbdomenTear = '3f1d',
  EyeGouge = '3f1e',
  BurstStrike = '3f22',
  NoMercy = '3f0a',
  RoughDivide = '3f1a',
  BlastingZone = '3f25',
  BowShock = '3f1f',
  Bloodfest = '3f24',
}


export const Openers: ActionOpener[] = [{
  name: 'Standard Opener',
  sequenceIds: [
    GnbSkills.KeenEdge,
    GnbSkills.BrutalShell,
    GnbSkills.NoMercy,
    GnbSkills.SolidBarrel,
    GnbSkills.GnashingFang,
    GnbSkills.JugularRip,
    GnbSkills.RoughDivide,
    GnbSkills.SonicBreak,
    GnbSkills.BowShock,
    GnbSkills.BlastingZone,
    GnbSkills.SavageClaw,
    GnbSkills.Bloodfest,
    GnbSkills.AbdomenTear,
    GnbSkills.WickedTalon,
    GnbSkills.RoughDivide,
    GnbSkills.EyeGouge,
    GnbSkills.BurstStrike,
    GnbSkills.BurstStrike,
    GnbSkills.KeenEdge,
    GnbSkills.BrutalShell,
    GnbSkills.SolidBarrel,
  ]
}];