export interface CacheSerializer<T> {
  parse(value: string): Promise<T>;
  stringify(value: T): Promise<string>;
}
