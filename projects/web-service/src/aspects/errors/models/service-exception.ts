export class ServiceException {
  public status: string;
  public error: Error;
  constructor(data: ServiceException) {
    this.status = data.status;
    this.error = data.error;
  }
}