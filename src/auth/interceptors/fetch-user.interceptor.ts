import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class FetchUserInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  async intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ){
    const request = context.switchToHttp().getRequest();
    const userId = request.userId;
    if(!userId) throw new UnauthorizedException();
    
    const user = await this.authService.fetchUser(userId);
    request.currentUser = user;

    return handler.handle();
  }
}
