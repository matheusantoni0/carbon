const emptyObject = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Newable<T> = new (...args: any[]) => T;

export type ObjectLiteral = typeof emptyObject;
export interface Abstract<T> {
  prototype: T;
}
