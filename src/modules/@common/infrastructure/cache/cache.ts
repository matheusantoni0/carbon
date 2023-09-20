/* eslint-disable no-console */
import { None, Option } from "#/libs/strict-monapt";

import { CacheSerializer } from "#/modules/@common/infrastructure/cache/cache-serializer";
import { CacheStorage } from "#/modules/@common/infrastructure/cache/cache-storage";
import { NullCacheStorage } from "#/modules/@common/infrastructure/cache/null-cache-storage";

export type CacheKey = string;

export class Cache<T> {
  private static readonly defaultTTL = 3600;

  private static storage: CacheStorage = new NullCacheStorage();

  public constructor(
    private readonly namespace: string,
    private readonly serializer: CacheSerializer<T>,
    private readonly defaultTTL = Cache.defaultTTL,
  ) {}

  public static useStorage(storage: CacheStorage): void {
    Cache.storage = storage;
  }

  public static key(...parts: string[]): CacheKey {
    return parts.join("#");
  }

  public async get(key: string): Promise<Option<T>> {
    const keyWithNamespace = Cache.key(this.namespace, key);

    try {
      const value = await Cache.storage.get(keyWithNamespace);
      if (value.isEmpty()) return None();

      const parsed = await this.serializer.parse(value.get());

      console.info(`Got item from cache: ${keyWithNamespace}`, {
        key: keyWithNamespace,
        value: value.get(),
      });

      return Option(parsed);
    } catch (error: unknown) {
      this.logError(keyWithNamespace, "Failed to get item from cache", error);
      return None();
    }
  }

  public async set(key: string, value: T, ttl?: number): Promise<void> {
    const keyWithNamespace = Cache.key(this.namespace, key);

    try {
      const stringified = await this.serializer.stringify(value);

      await Cache.storage.set(keyWithNamespace, stringified, ttl ?? this.defaultTTL);

      console.info(`Added item to cache: ${keyWithNamespace}`, {
        key: keyWithNamespace,
        value: stringified,
      });
    } catch (error: unknown) {
      this.logError(keyWithNamespace, "Failed to add item to cache", error);
    }
  }

  public async delete(key: string): Promise<void> {
    const keyWithNamespace = Cache.key(this.namespace, key);

    try {
      await Cache.storage.delete(keyWithNamespace);
    } catch (error: unknown) {
      this.logError(keyWithNamespace, "Failed to delete item from cache", error);
      throw error;
    }
  }

  private logError(key: string, message: string, error: unknown): void {
    if (error instanceof Error) {
      error = JSON.stringify(error, Object.getOwnPropertyNames(error));
    } else {
      error = JSON.stringify(error);
    }

    console.error(message, { key, error });
  }
}
/* eslint-enable no-console */
