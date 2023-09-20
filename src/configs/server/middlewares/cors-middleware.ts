import cors from "cors";
import { Request, Response, NextFunction, RequestHandler } from "express";

import { CORS_ALLOWED_ORIGINS } from "#/configs/env/settings";

export class CorsMiddleware {
  private readonly cors = cors({
    origin: this.parseCorsAllowedOrigins(),
    credentials: true,
  });

  public constructor(private readonly corsSpecs: string) {}

  public static create(corsSpecs = CORS_ALLOWED_ORIGINS): RequestHandler {
    const middleware = new CorsMiddleware(corsSpecs);
    return (req: Request, res: Response, next: NextFunction): void => middleware.use(req, res, next);
  }

  public use(req: Request, res: Response, next: NextFunction): void {
    this.cors(req, res, next);
  }

  private parseCorsAllowedOrigins(): Array<string | RegExp> {
    return this.corsSpecs.split(",").map((corsSpec) => {
      if (corsSpec.startsWith("/")) {
        return this.stringToRegex(corsSpec);
      }

      return corsSpec;
    });
  }

  private stringToRegex(expression: string): RegExp {
    const flags = expression.replace(/.*\/([gimy]*)$/, "$1");
    const pattern = expression.replace(new RegExp("^/(.*?)/" + flags + "$"), "$1");
    return new RegExp(pattern, flags);
  }
}
