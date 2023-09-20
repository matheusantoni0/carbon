import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import { HttpError } from "routing-controllers";

import { common } from "#/modules/@common/errors";
import { ApplicationErrorResponse } from "#/modules/@common/infrastructure/application-error-response";

export class DefaultErrorHandlerMiddleware {
  public static create(): ErrorRequestHandler {
    const middleware = new DefaultErrorHandlerMiddleware();
    // eslint-disable-next-line max-params
    return (error: Error, req: Request, res: Response, next: NextFunction): void =>
      middleware.use(error, req, res, next);
  }

  // eslint-disable-next-line max-params
  public use(error: Error, req: Request, res: Response, next: NextFunction): void {
    if (res.headersSent) {
      return next(error);
    }

    this.handleError(error, res);
  }

  private handleError(error: unknown, res: Response): void {
    if (!(error instanceof HttpError)) return this.handleExceptions(error, res);

    if (error.httpCode < StatusCodes.INTERNAL_SERVER_ERROR) {
      res.status(error.httpCode).send(_.omit(error, "httpCode"));
      return;
    }

    res.status(error.httpCode).send({
      code: StatusCodes[error.httpCode].toLocaleLowerCase(),
      message: StatusCodes[error.httpCode],
    });
  }

  private handleExceptions(error: unknown, res: Response): void {
    this.logUnhandledError(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(new ApplicationErrorResponse(common.internalServerError));
  }

  private logUnhandledError(error: unknown): void {
    // eslint-disable-next-line no-console
    console.error("\n⚠️ Unhandled request error", {
      error,
    });
  }
}
