/* eslint-disable */
require("reflect-metadata");
require("module-alias").addAlias("#", __dirname);

require("#/configs/env/load-envs");
require("#/configs/env/load-modules").load();
require("#/configs/database/configure-knex");

import { APP_PORT } from "#/configs/env/settings";
import { server } from "#/configs/server";
import { Container } from "#/modules/@common/infrastructure/container";
import { isTest } from "#/utils/environment";
import { diContainer } from "./di-container";
import { initialize } from "helios-opentelemetry-sdk";

initialize({
  apiToken: "3b4ff473d38d6d4215f9", // TODO: Insert API token from Helios.
  serviceName: "carbon", // TODO: Insert service name.
  enable: true, // Defaults to false if omitted.
  environment: "dev", // Defaults to process.env.NODE_ENV if omitted.
});

Container.useStorage(diContainer);

const port = isTest() ? APP_PORT + 1 : APP_PORT;

server.listen(port, () => {
  console.info(`✔️ Server running on port ${APP_PORT}`);
});

export default server;
/* eslint-enable */
