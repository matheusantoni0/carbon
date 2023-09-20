/* eslint-disable @typescript-eslint/naming-convention,eslint-comments/disable-enable-pair */
import { None, Option as OptionStatic } from "#/libs/strict-monapt/monapt";

type Option<A> = OptionStatic.Option<A>;
const Option = OptionStatic.Option;

export { None, Option };
export { Some } from "#/libs/strict-monapt/some";
