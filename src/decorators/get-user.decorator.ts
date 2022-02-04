import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../auth/user.entity';

export const GetUser = createParamDecorator(function (
  _data: never,
  ctx: ExecutionContext,
): User {
  return ctx.switchToHttp().getRequest().currentUser;
});
