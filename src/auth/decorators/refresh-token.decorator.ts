import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(function (
  _data: never,
  ctx: ExecutionContext,
): string {
    const refreshToken = ctx.switchToHttp().getRequest().cookies['refresh-token'];
    if(!refreshToken) throw new BadRequestException();
    return refreshToken;
});
