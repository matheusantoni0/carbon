import { Option as MonaptOption } from "monapt";

import { Option } from "#/libs/strict-monapt/option";

export class None<A> extends Option<A> {
  public throw(): never {
    throw new MonaptOption.NoSuchElementError();
  }
}
