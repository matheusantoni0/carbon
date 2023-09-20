import jwt, { JwtPayload } from "jsonwebtoken";
import _ from "lodash";

import { Option } from "#/libs/strict-monapt";

export class AuthenticationToken {
  private readonly token: string;

  private readonly decodedToken: JwtPayload;

  public constructor(token: string) {
    const sanitizedToken = token.replace(/^bearer/i, "").trim();
    const decodedToken = jwt.decode(sanitizedToken);

    if (decodedToken === null || typeof decodedToken === "string") {
      throw new Error("Invalid token");
    }

    this.token = sanitizedToken;
    this.decodedToken = decodedToken;
  }

  public static isValid(token: string): boolean {
    try {
      new AuthenticationToken(token);
      return true;
    } catch (error: unknown) {
      return false;
    }
  }

  public getClaim<T>(key: string): Option<T> {
    return Option(_.get(this.decodedToken, key));
  }

  public getAllClaims(): JwtPayload {
    return this.decodedToken;
  }

  public toString(): string {
    return this.token;
  }
}
