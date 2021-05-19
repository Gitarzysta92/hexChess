import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ContextUser as CtxUser } from 'src/core/models/context-user';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    return user as CtxUser; 
  },
);