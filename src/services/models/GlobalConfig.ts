import { makeAutoObservable } from 'mobx';
import Database from 'services/database';

export interface IGlobalConfig {
  id?: string;
  locked: boolean;
}

export class GlobalConfig implements IGlobalConfig {
  id = 'config';
  locked: boolean;

  constructor(args: IGlobalConfig) {
    makeAutoObservable(this);
    this.locked = args.locked;
  }

  async save() {
    return Database.config.put(this);
  }

  static async get() {
    return Database.config.get('config') ?? new GlobalConfig({ locked: false });
  }
}