import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';
import { ServiceException } from "./models/service-exception";

interface HttpRequest {
  user?: { id: number, email: string }
}

@Catch(ServiceException)
export class ServiceExceptionFilter implements ExceptionFilter {
  catch(exception: ServiceException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof ServiceException
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;

      response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}