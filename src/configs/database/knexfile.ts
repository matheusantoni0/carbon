/* eslint-disable import/no-default-export */
/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import path from "path";

require("module-alias").addAlias("#", path.resolve(__dirname, "..", ".."));

import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USER } from "#/configs/env/settings";

interface StaticConnectionConfig {
  database: string | undefined;
  user: string | undefined;
  password: string | undefined;
  host: string | undefined;
  ssl:
    | boolean
    | {
        rejectUnauthorized: boolean;
        ca: string | undefined;
  };
  expirationChecker?: () => boolean
}

const staticConnection: StaticConnectionConfig = {
  database: DATABASE_NAME,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  host: DATABASE_HOST,
  ssl: false,
};

const developmentConfig = {
  client: "pg",
  connection: staticConnection,
  pool: {
    min: 2,
    max: 10,
  },

};

const productionConfig = {
  client: "pg",
  connection: staticConnection,
  pool: {
    min: 2,
    max: 10,
  },
};

const config = {
  test: {
    ...developmentConfig,
    connection: {
      ...staticConnection,
      database: `${staticConnection.database}_test`,
    },
  },
  development: developmentConfig,
  staging: productionConfig,
  production: productionConfig,
};

export default config;
/* eslint-enable @typescript-eslint/no-var-requires */
/* eslint-enable @typescript-eslint/no-require-imports */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
/* eslint-enable import/first */
/* eslint-enable import/no-default-export */
