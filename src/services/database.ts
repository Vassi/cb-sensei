import Dexie from 'dexie';
import { Skill } from './models/Skill';
import skillCollection from './classes/skillCollection.json';
import { Job } from 'types/Job';

export class SkillMetadata implements ISkillMetadata {
  id?: string;
  playerId: number;
  job: Job;
  skillId: string;
  posX: number;
  posY: number;

  constructor(args: ISkillMetadata) {
    this.id = args.id;
    this.playerId = args.playerId;
    this.job = args.job;
    this.skillId = args.skillId;
    this.posX = args.posX;
    this.posY = args.posY;
  }

  async save() {
    await db.skillMeta.put(this);
  }
}

class Database extends Dexie {
  skills: Dexie.Table<Skill, string>;
  skillMeta: Dexie.Table<SkillMetadata, string>;

  constructor() {
    super('cb_sensei');
    this.version(1).stores({
      skills: 'id, name, *job, type',
      skillMeta: '++id, [playerId+job]',
    });

    this.skills = this.table('skills');
    this.skills.mapToClass(Skill);

    this.skillMeta = this.table('skillMeta');
    this.skillMeta.mapToClass(SkillMetadata);
  }
}

const db = new Database();
db.on('populate', async () => {
  db.skills.bulkPut(skillCollection.map(sk => {
    return {
      ...sk,
      job: sk.job as Job[]
    }
  }));
});

export interface ISkillMetadata {
  id?: string;
  playerId: number;
  job: Job;
  skillId: string;
  posX: number;
  posY: number;
}

export default db;