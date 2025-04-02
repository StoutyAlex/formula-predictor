import { firestore } from '~/firebase/firebase-config.server';

export abstract class CollectionService {
  protected readonly collectionId: string;
  protected readonly collection: FirebaseFirestore.CollectionReference;

  constructor({ collectionId }: { collectionId: string }) {
    this.collectionId = collectionId;

    this.collection = firestore.collection(this.collectionId);
  }
}
