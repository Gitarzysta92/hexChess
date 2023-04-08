import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ContextUserData } from '../models/context-user-data';

export const ContextUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    return user as ContextUserData; 
  },
);