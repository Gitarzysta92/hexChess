export class MyAccount {
  public createdAt: Date;
  public languageId: number;
  public password: string;
  public email: string;

  constructor(data: Partial<MyAccount> = {}) {
    this.email = data.email;
    this.password = MyAccount.passwordPlaceholder;
    this.createdAt = data.createdAt;
    this.languageId = data.languageId; 
  }

  static passwordPlaceholder = "**********"
} 