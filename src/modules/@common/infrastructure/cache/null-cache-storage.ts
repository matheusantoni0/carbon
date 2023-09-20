import { None, Option } from "#/libs/strict-monapt";

import { CacheStorage } from "#/modules/@common/infrastructure/cache/cache-storage";

export class NullCacheStorage implements CacheStorage {
  public async get(_key: string): Promise<Option<string>> {
    return None();
  }

  public async set(_key: string, _value: string, _ttl: number): Promise<void> {
    /* nothing to do */
  }

  public async delete(_key: string): Promise<void> {
    /* nothing to do */
  }
}
