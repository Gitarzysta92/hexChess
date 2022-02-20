export class ContextUser {
  public id: number;
  public email: string;
  constructor(data: Partial<ContextUser>) {
    this.id = data.id;
    this.email = data.email;
  }
}