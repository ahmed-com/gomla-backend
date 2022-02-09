import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../auth/user.entity';

export const GetUserId = createParamDecorator(function (
  _data: never,
  ctx: ExecutionContext,
): number {
    return ctx.switchToHttp().getRequest().userId;
});
