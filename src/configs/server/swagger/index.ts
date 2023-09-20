import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import * as oa from "openapi3-ts";
import { getMetadataArgsStorage, RoutingControllersOptions } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";

import { APP_NAME } from "#/configs/env/settings";

const metadataSchemas = validationMetadatasToSchemas();
export class Swagger {
  // eslint-disable-next-line max-lines-per-function
  public static setup(routingControllersOptions: RoutingControllersOptions): oa.OpenAPIObject {
    const storage = getMetadataArgsStorage();
    return routingControllersToSpec(storage, routingControllersOptions, {
      components: {
        schemas: metadataSchemas as Record<string, oa.SchemaObject | oa.ReferenceObject>,
        securitySchemes: {
          bearerAuth: {
            type: "apiKey",
            name: "authorization",
            in: "header",
          },
          anonymousAuth: {
            type: "apiKey",
            name: "authorization",
            in: "header",
          },
          pinningAuth: {
            type: "apiKey",
            name: "authorization",
            in: "header",
          },
          basicAuth: {
            type: "http",
            scheme: "basic",
          },
        },
      },
      info: {
        description: "Make with 💚",
        title: `${APP_NAME} documentation`,
        version: "1.0.0",
      },
    });
  }
}
