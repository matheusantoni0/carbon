import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import { StatusCodes } from "http-status-codes";
import { RoutingControllersOptions, useContainer, useExpressServer } from "routing-controllers";
import { serve, setup } from "swagger-ui-express";

import { APP_NAME } from "#/configs/env/settings";
import { BodyParserMiddleware } from "#/configs/server/middlewares/body-parser-middleware";
import { CorsMiddleware } from "#/configs/server/middlewares/cors-middleware";
import { DefaultErrorHandlerMiddleware } from "#/configs/server/middlewares/default-error-handler-middleware";
import { Swagger } from "#/configs/server/swagger";

import { diContainer } from "#/di-container";

const server = express();

const routingOptions: RoutingControllersOptions = {
  routePrefix: "/",
  validation: true,
  classTransformer: true,
  plainToClassTransformOptions: {
    enableImplicitConversion: false,
  },
  defaultErrorHandler: false,
};

server.disable("x-powered-by");

server.set("trust proxy", ["uniquelocal", "loopback"]);

server.use("/docs", serve, setup(Swagger.setup(routingOptions)));

server.use(helmet());
server.use(CorsMiddleware.create());
server.use(cookieParser());
server.use(BodyParserMiddleware.create());

useContainer(diContainer);
useExpressServer(server, routingOptions);

server.get("/", (req, res) => res.status(StatusCodes.OK).send(`Hello Bro! I'm ${APP_NAME}`));

server.use(DefaultErrorHandlerMiddleware.create());

export { server };
