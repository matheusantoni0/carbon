/* eslint-disable no-undef */
const staticConnection = {
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
};

const developmentConfig = {
  client: "pg",
  connection: staticConnection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "./dist/src/configs/database/migrations",
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

module.exports = config;
/* eslint-enable no-undef */
