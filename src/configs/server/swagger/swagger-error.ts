/* eslint-disable @typescript-eslint/naming-convention */
import { StatusCodes } from "http-status-codes";
import { OpenAPIParam } from "routing-controllers-openapi";

import { common } from "#/modules/@common/errors";
import { ApplicationError } from "#/modules/@common/infrastructure/application-error-response";

interface Props {
  error?: ApplicationError;
  statusCode: StatusCodes;
}

export class SwaggerError {
  private static readonly commonErrors: Props[] = [
    {
      error: common.internalServerError,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    },
    {
      error: common.serverTimeout,
      statusCode: StatusCodes.GATEWAY_TIMEOUT,
    },
  ];

  public static generate(props: Props[]): OpenAPIParam {
    const errors = [...props, ...this.commonErrors];

    const mappedErrors = errors.map((prop) => ({
      [this.buildExhibitionCode(prop)]: this.buildExhibitionValue(prop),
    }));

    return {
      responses: { ...mappedErrors.reduce((a, b) => Object.assign(a, b), {}) },
    };
  }

  private static buildExhibitionCode(prop: Props): string {
    return prop.error ? `${prop.error.code} - statusCode: ${prop.statusCode}` : prop.statusCode.toString();
  }

  private static buildExhibitionValue(prop: Props): Record<string, unknown> {
    const exhibitionObject = {
      description: StatusCodes[prop.statusCode],
      content: { "application/json": {} },
    };

    if (prop.error) {
      exhibitionObject.description = prop.error.message;
      exhibitionObject.content["application/json"] = {
        example: prop.error,
      };
    }

    return exhibitionObject;
  }
}
/* eslint-enable @typescript-eslint/naming-convention */
