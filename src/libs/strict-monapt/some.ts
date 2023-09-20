import { Option } from "#/libs/strict-monapt/option";

export class Some<A> extends Option<A> {
  public get(): A {
    return this.option.get();
  }
}
