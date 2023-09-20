import { Storage } from "#/libs/async-storage/storage";

export class DummyStorage implements Storage {
  private storage: Record<string, unknown> = {};

  public get(key: string): unknown {
    return this.storage[key];
  }

  public run(fn: () => void): void {
    fn();
  }

  public set(key: string, value: unknown): void {
    this.storage[key] = value;
  }
}
