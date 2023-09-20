import bodyParser from "body-parser";
import { NextFunction, Request, RequestHandler, Response } from "express";

export class BodyParserMiddleware {
  private readonly plainTextEndpoints = ["/encrypted-webhook/notification"];

  private readonly bodyParserJson = bodyParser.json({ limit: "50mb" });

  private readonly bodyParserText = bodyParser.text({
    type: (): boolean => true,
  });

  public static create(): RequestHandler {
    const middleware = new BodyParserMiddleware();
    return (req: Request, res: Response, next: NextFunction): void => middleware.use(req, res, next);
  }

  public use(req: Request, res: Response, next: NextFunction): void {
    if (this.isPlainTextEndpoint(req.url)) {
      this.bodyParserText(req, res, next);
      return;
    }

    this.bodyParserJson(req, res, next);
  }

  private isPlainTextEndpoint(url: string): boolean {
    return this.plainTextEndpoints.some((endpoint) => url.startsWith(endpoint));
  }
}
