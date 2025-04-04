import type { DriverEntity } from './entities/driver.entity';
import type { CreateDriverData } from '~/lib/schemas/driver-schema';
import { CollectionService } from '~/types/collection.interface';

export class DriverCollection extends CollectionService {
  constructor(season: string) {
    super({ collectionId: `drivers-${season}` });
  }

  static season(season: string) {
    return new DriverCollection(season);
  }

  async getAll() {
    // const key = `${this.collectionId}:get-all`;
    // const cachedValue = await Cache.get<DriverEntity[]>(key);
    // if (cachedValue) {
    //   return cachedValue;
    // }

    // const snapshot = await firestore.collection(this.collectionId).get();
    // const constructors = snapshot.docs.map((doc) => {
    //   const data = doc.data();

    //   return {
    //     id: doc.id,
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //     abbreviation: data.abbreviation,
    //     number: data.number,
    //     constructorId: data.constructorId,
    //     country: data.country,
    //   } as DriverEntity;
    // });

    const drivers = [] as DriverEntity[];

    // await Cache.set(key, drivers);
    return drivers;
  }

  update = async (id: string, data: CreateDriverData) => {
    // const docRef = firestore.collection(this.collectionId).doc(id);
    // const doc = await docRef.get();

    // if (!doc.exists) return false;

    // await docRef.update(data);
    // await Cache.del(`${this.collectionId}:get-all`);

    return {
      id,
      ...data,
    } as DriverEntity;
  };

  delete = async (id: string) => {
    // const docRef = firestore.collection(this.collectionId).doc(id);
    // const doc = await docRef.get();
    // if (!doc.exists) return;
    // await docRef.delete();
    // await Cache.del(`${this.collectionId}:get-all`);
  };

  create = async (data: CreateDriverData) => {
    // const docRef = await firestore.collection(this.collectionId).add(data);
    // await Cache.del(`${this.collectionId}:get-all`);
    return {
      // id: docRef.id,
      id: '1',
      ...data,
    } as DriverEntity;
  };
}
