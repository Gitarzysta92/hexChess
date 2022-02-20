import { ErrorHandler } from "@angular/core";

export class MyErrorHandler implements ErrorHandler {
  handleError(error) {
    console.log(error, 'asd');
    // do something with the exception
  }
}

