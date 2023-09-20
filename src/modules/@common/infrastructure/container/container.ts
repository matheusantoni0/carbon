import { Newable } from "#/libs/typescript/generic-types";
import { Abstract } from "#/libs/typescript/generic-types/generic-types";

import { DefaultContainer } from "#/modules/@common/infrastructure/container/default-container";

export type ServiceIdentifier<T = unknown> = Newable<T> | Abstract<T>;

export interface ContainerStorage {
  get<T>(type: ServiceIdentifier<T>): T;
}

export class Container {
  private static storage: ContainerStorage = new DefaultContainer();

  public static useStorage(newStorage: ContainerStorage): void {
    Container.storage = newStorage;
  }

  public static get<T>(identifier: ServiceIdentifier<T>): T {
    return Container.storage.get(identifier);
  }
}
