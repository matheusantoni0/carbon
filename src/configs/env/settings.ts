import assert from "assert";

export function getEnvOrThrow(envName: string): string {
  const env = process.env[envName];
  assert(env, `Missing environment variable ${envName}`);
  return env;
}

export function getEnvOrDefault(envName: string, defaultValue: string): string {
  return process.env[envName] ?? defaultValue;
}

export const ENVIRONMENT = getEnvOrDefault("NODE_ENV", "development");
export const APP_PORT = getEnvOrDefault("APP_PORT", "3003");
export const APP_NAME = getEnvOrThrow("APP_NAME");
export const LOAD_MODULES = getEnvOrDefault("LOAD_MODULES", ["garage", "vehicle"].join(","));
export const CORS_ALLOWED_ORIGINS = getEnvOrDefault("CORS_ALLOWED_ORIGINS", "*");

export const DATABASE_NAME = getEnvOrThrow("DATABASE_NAME");
export const DATABASE_USER = getEnvOrThrow("DATABASE_USER");
export const DATABASE_PASSWORD = getEnvOrThrow("DATABASE_PASSWORD");
export const DATABASE_HOST = getEnvOrThrow("DATABASE_HOST");
