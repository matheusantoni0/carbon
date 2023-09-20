// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */
import { Option as MonaptOption } from "monapt";

import { None as None_ } from "#/libs/strict-monapt/none";
import { OptionType } from "#/libs/strict-monapt/option";
import { Some } from "#/libs/strict-monapt/some";

const None = <A>(): None_<A> => new None_(MonaptOption<A>(undefined));

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Option {
  export function Option<A>(value?: A | null): OptionType<A> {
    if (value === undefined || value === null) {
      return None();
    }

    return new Some(MonaptOption(value));
  }
  export type Option<A> = OptionType<A>;
}

export { None, Option };
