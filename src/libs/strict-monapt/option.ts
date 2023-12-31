import { Option as MonaptOption } from "monapt";

import { Option as OptionInstance } from "#/libs/strict-monapt/index";
import { None } from "#/libs/strict-monapt/none";
import { Some } from "#/libs/strict-monapt/some";

export type OptionType<A> = Some<A> | None<A>;

export abstract class Option<A> {
  protected option: MonaptOption<A>;

  public constructor(option: MonaptOption<A>) {
    this.option = option;
  }

  public static new<A>(value?: A | null): OptionType<A> {
    return OptionInstance(value);
  }

  public isDefined(this: Option<A>): this is Some<A> {
    return this.option.isDefined;
  }

  public isEmpty(this: Option<A>): this is None<A> {
    return this.option.isEmpty;
  }

  public equals<B>(other: OptionType<B>): boolean {
    if (other.isEmpty()) {
      return this.isEmpty();
    }

    return this.option.equals(other.option);
  }

  public filter(this: Option<A>, predicate: (value: A) => boolean): OptionType<A> {
    const option = this.option.filter(predicate);
    if (option.isDefined) {
      this.option = option;

      return this as Some<A>;
    }

    return OptionInstance();
  }

  public filterNot(this: Option<A>, predicate: (value: A) => boolean): OptionType<A> {
    const option = this.option.filterNot(predicate);
    if (option.isDefined) {
      this.option = option;

      return this as Some<A>;
    }

    return OptionInstance();
  }

  public flatMap<B, C extends B>(this: Option<C>, flatMapper: (value: C) => OptionType<B>): OptionType<B> {
    if (this.isEmpty()) {
      return this;
    }

    return flatMapper(this.option.get());
  }

  public foreach(run: (value: A) => void): void {
    this.option.foreach(run);
  }

  public getOrElse<B>(defaultValue: () => B): B {
    return this.option.getOrElse(defaultValue);
  }

  public map<B>(mapper: (value: A) => B): OptionType<B> {
    const option = this.option.map(mapper);
    if (option.isDefined) {
      return OptionInstance(option.get());
    }

    return OptionInstance();
  }

  /* eslint-disable @typescript-eslint/naming-convention */
  public match<B>(matcher: { some(this: void, a: A): B; none(this: void): B }): B {
    return this.option.match({
      Some: matcher.some,
      None: matcher.none,
    });
  }
  /* eslint-enable @typescript-eslint/naming-convention */

  public orElse<B, C extends B>(this: Option<C>, alternative: () => OptionType<B>): OptionType<B> {
    if (this.isEmpty()) {
      return alternative();
    }

    return this as Some<C>;
  }

  public unwrap(): A | undefined {
    return this.option.getOrElse((): A | undefined => undefined);
  }

  public getOrThrow(): A {
    const value = this.unwrap();

    if (value === undefined) {
      throw new TypeError("Strict Monapt expected value to be defined");
    }

    return value;
  }
}
