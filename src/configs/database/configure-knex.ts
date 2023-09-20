import Knex, { Knex as KnexType } from "knex";
import { Model } from "objection";

import knexConfig from "#/configs/database/knexfile";

import { isProdOrStaging } from "#/utils/environment";

let knexInstance: KnexType;

if (isProdOrStaging()) {
  knexInstance = Knex(knexConfig.production);
} else {
  knexInstance = Knex(knexConfig.development);
}

Model.knex(knexInstance);

export { knexInstance };
