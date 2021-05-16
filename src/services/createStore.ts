import PlayerService from './playerService';
import SkillService from './skillService';
import AppService from './appService';
import RotationService from './rotationService';

export type AppStores = {
  player: PlayerService,
  app: AppService,
  skills: SkillService,
  rotation: RotationService,
};

export default function createStore() {
  const app = new AppService();
  const player = new PlayerService(app);
  const skills = new SkillService(app);
  const rotation = new RotationService(app, skills, player);

  return {
    player,
    app,
    skills,
    rotation,
  } as AppStores;
}