import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../auth/user.entity';

export const GetUser = createParamDecorator(function (
  _data: never,
  ctx: ExecutionContext,
): User {
    // this doesn't have to run after fetching the user 
    // so build another interceptor that uses the auth service to only validate access tokens and returns the userId 
    return ctx.switchToHttp().getRequest().userId;
});
