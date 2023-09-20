import { createNamespace } from "cls-hooked";

import { ENVIRONMENT } from "#/configs/env/settings";

import { DummyStorage } from "#/libs/async-storage/dummy-storage";
import { Storage } from "#/libs/async-storage/storage";

export function createStorage(namespace = "default"): Storage {
  if (ENVIRONMENT === "test") {
    return new DummyStorage();
  }

  return createNamespace(namespace);
}
