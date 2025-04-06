interface CachedValue {
  value: any;
  expiration: number;
}

interface SetOptions {
  expiration?: number;
}

export class CacheService {
  private static cache: Map<string, CachedValue> = new Map();

  static get<T>(key: string): T | null {
    const cachedValue = this.cache.get(key) as CachedValue | undefined;

    if (!cachedValue) {
      return null;
    }

    if (cachedValue.expiration < Date.now()) {
      this.cache.delete(key);
    }

    return cachedValue.value as T;
  }

  static set(key: string, value: any, options?: SetOptions): void {
    const cachedValue: CachedValue = {
      value,
      expiration: options?.expiration ? Date.now() + options.expiration : 600,
    };

    this.cache.set(key, cachedValue);
  }

  static delete(key: string): void {
    this.cache.delete(key);
  }

  static clear(): void {
    this.cache.clear();
  }
}
