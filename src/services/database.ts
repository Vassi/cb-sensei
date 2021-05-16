import Dexie from 'dexie';
import { Skill } from './models/Skill';
import skillCollection from './classes/skillCollection.json';
import { Job } from 'types/Job';
import { GlobalConfig } from './models/GlobalConfig';
import { JobConfig } from './models/JobConfig';

class Database extends Dexie {
  skills: Dexie.Table<Skill, string>;
  jobConfig: Dexie.Table<JobConfig, string>;
  config: Dexie.Table<GlobalConfig, string>;

  constructor() {
    super('cb_sensei');
    this.version(1).stores({
      skills: 'id, name, *job, type',
      config: 'id',
      jobConfig: '++id, [playerId+job]',
    });

    this.skills = this.table('skills');
    this.jobConfig = this.table('jobConfig');
    this.config = this.table('config');
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

export default db;