export class ContextUserData {
  public id: string;
  public profileId: string;
  public email: string;
  constructor(data: Partial<ContextUserData>) {
    this.id = data.id;
    this.email = data.email;
  }
}
