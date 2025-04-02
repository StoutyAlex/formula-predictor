import type { SeasonString as TSeason } from '~/types/f1.types';
import { ConstructorCollection } from '../database/constructor.collection.server';
import { DriverCollection } from '../database/driver.collection.server';
import { SeasonCollection } from '~/database/season.collection.server';

export class SeasonService {
  public readonly teams: ConstructorCollection;
  public readonly drivers: DriverCollection;

  private readonly season: string;

  constructor(season: TSeason) {
    this.season = season;

    this.teams = new ConstructorCollection(this.season);
    this.drivers = new DriverCollection(this.season);
  }

  static async getSeasons() {
    const seasons = await SeasonCollection.getAll();
    return seasons;
  }

  static year(season: TSeason) {
    return new SeasonService(season);
  }
}
