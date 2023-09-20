type ModifierCallback<T> = (dataToModify: T) => void;

export abstract class Builder<T, TBuilder extends Builder<T, TBuilder>> {
  protected modifiers: Array<ModifierCallback<T>> = [];

  protected constructor(private readonly innerType: (new () => TBuilder)) {}

  public build(): T {
    const instance = this.buildDefault();

    this.applyModifiers(instance);

    return instance;
  }

  public with<K extends keyof T>(key: K, value: T[K]): TBuilder {
    return this.newBuilder((entity) => {
      entity[key] = value;
    });
  }

  public buildMany(quantity?: number): T[] {
    if (quantity === undefined) {
      const min = 2;
      const max = 6;
      quantity = Math.floor(Math.random() * (max - min + 1) + min);
    }

    return Array.from({ length: quantity }, () => this.build());
  }

  protected applyModifiers(instance: T): void {
    this.modifiers.forEach((modifier) => {
      modifier(instance);
    });
  }

  protected newBuilder(modifier: ModifierCallback<T>): TBuilder {
    const newBuilder = new this.innerType();

    newBuilder.modifiers = [...this.modifiers, modifier];

    return newBuilder;
  }

  protected abstract buildDefault(): T;
}
