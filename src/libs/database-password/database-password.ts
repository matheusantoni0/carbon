export class DatabasePassword {
  public constructor(public password: string) { }

  public isExpired(): boolean {
    return false;
  }
}
