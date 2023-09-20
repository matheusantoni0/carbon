import _ from "lodash";

import { LOAD_MODULES } from "#/configs/env/settings";

export function load(modules: string | string[] = LOAD_MODULES): void {
  if (typeof modules === "string") {
    modules = modules
      .split(",")
      .map((x) => x.trim())
      .filter((x) => !_.isEmpty(x));
  }

  // eslint-disable-next-line no-console
  console.log("\n✔️ Loading modules", modules);

  for (const module of modules) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports,import/no-dynamic-require
    require(`#/modules/${module}`);
  }
}
