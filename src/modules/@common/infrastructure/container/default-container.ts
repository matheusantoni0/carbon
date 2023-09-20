export class DefaultContainer {
  private readonly instances: Array<{ type: unknown; object: unknown }> = [];

  public get<T>(type: new (...args: never[]) => T): T {
    let instance = this.instances.find((instance) => instance.type === type);

    if (!instance) {
      instance = {
        type,
        object: new type(),
      };

      this.instances.push(instance);
    }

    return instance.object as T;
  }
}
