import { firestore } from '~/firebase/firebase-config.server';
import { type ConstructorEntity } from './entities/constructor.entity';
import type { CreateConstructorData } from '~/lib/schemas/constructor-schema';
import { CollectionService } from '~/types/collection.interface';
import { Cache } from '~/lib/decorators/cache.server';

export class ConstructorCollection extends CollectionService {
  constructor(season: string) {
    super({ collectionId: `constructors-${season}` });
  }

  static season(season: string) {
    return new ConstructorCollection(season);
  }

  async getAll() {
    const key = `${this.collectionId}:get-all`;
    const cachedValue = await Cache.get<ConstructorEntity[]>(key);
    if (cachedValue) {
      return cachedValue;
    }

    const snapshot = await firestore.collection(this.collectionId).get();
    const constructors = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        fullName: data.fullName,
        colour: data.colour,
        location: data.location,
        principal: data.principal,
        country: data.country,
        drivers: data.drivers || [],
      } as ConstructorEntity;
    });

    await Cache.set(key, constructors);
    return constructors;
  }

  update = async (id: string, data: CreateConstructorData) => {
    const docRef = firestore.collection(this.collectionId).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return false;

    await docRef.update(data);
    await Cache.del(`${this.collectionId}:get-all`);

    return {
      id,
      ...data,
    } as ConstructorEntity;
  };

  delete = async (id: string) => {
    const docRef = firestore.collection(this.collectionId).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return true;

    await docRef.delete();
    await Cache.del(`${this.collectionId}:get-all`);
    return true;
  };

  create = async (data: CreateConstructorData) => {
    const docRef = await firestore.collection(this.collectionId).add(data);
    await Cache.del(`${this.collectionId}:get-all`);

    return {
      id: docRef.id,
      ...data,
    } as ConstructorEntity;
  };
}
