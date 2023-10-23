export interface Storage {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
  run(fn: () => void): void;
}
