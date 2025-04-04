export abstract class CollectionService {
  protected readonly collectionId: string;

  constructor({ collectionId }: { collectionId: string }) {
    this.collectionId = collectionId;

  }
}
