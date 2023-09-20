import { Option } from "#/libs/strict-monapt";

export interface CacheStorage {
  get(key: string): Promise<Option<string>>;
  set(key: string, value: string, ttl: number): Promise<void>;
  delete(key: string): Promise<void>;
}
