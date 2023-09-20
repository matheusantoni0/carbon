import { injectable } from "inversify";

import { createStorage } from "#/libs/async-storage";

import { AuthenticationToken } from "#/modules/auth/domain/entities/authentication-token";

@injectable()
export class ApplicationContext {
  private static readonly context = createStorage("application-context");

  public static runInContext(fn: (...args: unknown[]) => void): void {
    ApplicationContext.context.run(fn);
  }

  public static setAuthenticationToken(authenticationToken: AuthenticationToken): void {
    ApplicationContext.context.set("authenticationToken", authenticationToken);
  }

  public static setCorrelationId(correlationId: string): void {
    ApplicationContext.context.set("correlationId", correlationId);
  }

  public static setRequestId(requestId: string): void {
    ApplicationContext.context.set("requestId", requestId);
  }

  public static setSourceIP(sourceIP: string): void {
    ApplicationContext.context.set("sourceIP", sourceIP);
  }

  public static setDeviceModel(deviceModel: string): void {
    ApplicationContext.context.set("deviceModel", deviceModel);
  }

  public static setAppBuildNumber(buildNumber: string): void {
    ApplicationContext.context.set("appBuildNumber", buildNumber);
  }

  public static setAppVersion(version: string): void {
    ApplicationContext.context.set("appVersion", version);
  }

  public static setDeviceKeyUserId(userId: string): void {
    ApplicationContext.context.set("deviceKeyUserId", userId);
  }

  public static getCorrelationId(): string {
    return ApplicationContext.context.get("correlationId") as string;
  }

  public getAuthenticationToken(): AuthenticationToken {
    return ApplicationContext.context.get("authenticationToken") as AuthenticationToken;
  }

  public getCorrelationId(): string {
    return ApplicationContext.context.get("correlationId") as string;
  }

  public getRequestId(): string {
    return ApplicationContext.context.get("requestId") as string;
  }

  public getSourceIP(): string {
    return ApplicationContext.context.get("sourceIP") as string;
  }

  public getDeviceModel(): string {
    return ApplicationContext.context.get("deviceModel") as string;
  }

  public getAppBuildNumber(): string {
    return ApplicationContext.context.get("appBuildNumber") as string;
  }

  public getAppVersion(): string {
    return ApplicationContext.context.get("appVersion") as string;
  }

  public getDeviceKeyUserId(): string {
    return ApplicationContext.context.get("deviceKeyUserId") as string;
  }
}
