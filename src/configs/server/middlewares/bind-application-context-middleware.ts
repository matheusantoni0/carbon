import { NextFunction, Request, RequestHandler, Response } from "express";

import { RequestHeadersExtractor } from "#/configs/server/middlewares/request-headers-extractor";

import { ApplicationContext } from "#/modules/@application/context/domain/providers/application-context";

export class BindApplicationContextMiddleware {
  public static create(): RequestHandler {
    const middleware = new BindApplicationContextMiddleware();
    return (req: Request, res: Response, next: NextFunction): void => middleware.use(req, res, next);
  }

  public use(req: Request, _res: Response, next: NextFunction): void {
    const headersExtrator = new RequestHeadersExtractor(req);
    const token = headersExtrator.tryParseJwtToken();

    ApplicationContext.runInContext(() => {
      if (token !== undefined) {
        ApplicationContext.setAuthenticationToken(token);
      }

      ApplicationContext.setCorrelationId(headersExtrator.getCorrelationId());
      ApplicationContext.setRequestId(headersExtrator.getRequestId());
      ApplicationContext.setSourceIP(headersExtrator.getIP());
      ApplicationContext.setDeviceModel(headersExtrator.getClientDeviceModel());
      ApplicationContext.setAppBuildNumber(headersExtrator.getClientBuildNumber());
      ApplicationContext.setDeviceKeyUserId(headersExtrator.getDeviceKeyUserId());
      ApplicationContext.setAppVersion(headersExtrator.getClientVersion());

      next();
    });
  }
}
