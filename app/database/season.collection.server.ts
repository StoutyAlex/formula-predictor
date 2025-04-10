import { type SeasonEntity } from './entities/season.entity';
import type { SeasonString } from '~/types/f1.types';
export class SeasonCollection {
  private static readonly collectionId: string = 'seasons';

  static getAll = async () => {
    // const key = `${this.collectionId}:get-all`;
    // const cachedValue = await Cache.get<SeasonEntity[]>(key);
    // if (cachedValue) {
    //   return cachedValue;
    // }

    // const snapshot = await firestore.collection(this.collectionId).get();
    // const seasons = snapshot.docs.map((doc) => {
    //   const data = doc.data();

    //   return {
    //     id: doc.id,
    //     yearString: data.yearString,
    //     yearNumber: data.yearNumber,
    //     startDate: data.startDate,
    //     endDate: data.endDate,
    //   } as SeasonEntity;
    // });

    const season2025: SeasonEntity = {
      id: '2025',
      yearString: '2025',
      yearNumber: 2025,
      startDate: new Date('2025-01-01').toISOString(),
      endDate: new Date('2025-12-31').toISOString(),
    };

    const seasons = [season2025] as SeasonEntity[];

    // await Cache.set(key, seasons);
    return seasons;
  };

  static get = async (season: SeasonString) => {
    // const seasons = await SeasonCollection.getAll();
    // const seasonData = seasons.find((s) => s.yearString === season);

    // if (!seasonData) return null;

    const season2025: SeasonEntity = {
      id: '2025',
      yearString: '2025',
      yearNumber: 2025,
      startDate: new Date('2025-01-01').toISOString(),
      endDate: new Date('2025-12-31').toISOString(),
    };

    return season2025;
  };
}
