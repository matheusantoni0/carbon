import { instanceToPlain, Expose } from "class-transformer";

export interface ApplicationError {
  code: string;
  message: string;
}

export class ApplicationErrorResponse {
  @Expose()
  public readonly code: string;

  @Expose()
  public readonly message: string;

  public constructor(error: ApplicationError) {
    this.code = error.code;
    this.message = error.message;
  }

  public toPlain(): unknown {
    return instanceToPlain(this);
  }
}
