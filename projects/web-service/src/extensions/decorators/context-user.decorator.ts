import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export class ContextUserData {
  public id: number;
  public email: string;
  constructor(data: Partial<ContextUserData>) {
    this.id = data.id;
    this.email = data.email;
  }
}


export const ContextUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    return user as ContextUserData; 
  },
);