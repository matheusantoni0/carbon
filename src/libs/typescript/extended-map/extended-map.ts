import assert from "assert";

export class ExtendedMap<K, V> extends Map<K, V> {
  public getOrDefault(key: K, defaultValue: V): V {
    return this.get(key) ?? defaultValue;
  }

  public getOrThrow(key: K, errorMessage = "Try to get key not mapped"): V {
    console.log(key);
    const value = this.get(key);
    assert(value !== undefined, errorMessage);
    return value;
  }

  public invert(): ExtendedMap<V, K> {
    const inverted = new ExtendedMap<V, K>();
    this.forEach((value, key) => inverted.set(value, key));

    return inverted;
  }
}
