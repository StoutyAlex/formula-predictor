import { FormulaData } from '../static-data/static.data';

export class SeasonService {
  static year(season: string) {
    return FormulaData.season(season);
  }
}
