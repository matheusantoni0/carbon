import { Request } from "express";
import _ from "lodash";
import { v4 as uuid } from "uuid";

import { APP_NAME } from "#/configs/env/settings";

import { AuthenticationToken } from "#/modules/auth/domain/entities/authentication-token";

export class RequestHeadersExtractor {
  public constructor(private readonly req: Request) {}

  public getCorrelationId(): string {
    return _.get(this.req, "headers.x-correlation-id", this.getRequestId()) as string;
  }

  public getRequestId(): string {
    return _.get(this.req, "headers.internal-request-id", uuid()) as string;
  }

  public getClientDeviceModel(): string {
    // eslint-disable-next-line max-len
    return _.get(this.req, "headers.x-app-device-model", _.get(this.req, `headers.x-${APP_NAME}-device-model`, "")) as string;
  }

  public getClientVersion(): string {
    return _.get(this.req, "headers.x-app-version", _.get(this.req, `headers.x-${APP_NAME}-version`, "")) as string;
  }

  public getClientPlatform(): string {
    return (
      _.get(this.req, "headers.x-app-platform", _.get(this.req, `headers.x-${APP_NAME}-app-platform`, "")) as string
    );
  }

  public getClientBuildNumber(): string {
    return (
      _.get(this.req, "headers.x-app-build-number", _.get(this.req, `headers.x-${APP_NAME}-build-number`, "")) as string
    );
  }

  public getIP(): string {
    return _.get(this.req, "ip", "");
  }

  public getDeviceKeyUserId(): string {
    return _.get(this.req, "headers.x-device-key-user-id", "") as string;
  }

  public getPinningToken(headerName: string): string {
    return _.get(this.req, `headers.${headerName}`, "") as string;
  }

  public tryParseJwtToken(): AuthenticationToken | undefined {
    try {
      const token = this.extractTokenFromRequest();

      if (typeof token !== "string") {
        return;
      }

      return new AuthenticationToken(token);
    } catch (error: unknown) { /* nothing to do */ }
  }

  private extractTokenFromRequest(): unknown {
    return _.get(this.req, "headers.authorization") ??
      _.get(this.req, "cookies.authorization");
  }
}
