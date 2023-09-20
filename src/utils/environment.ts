import { ENVIRONMENT } from "#/configs/env/settings";

export const isProdOrStaging = (): boolean => ENVIRONMENT === "production" || ENVIRONMENT === "staging";

export const isTest = (): boolean => ENVIRONMENT === "test";
