import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class FetchUserInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> {
    // const request = context.switchToHttp().getRequest();
    // extract the JWT from the request cookie
    // use the auth service to fetch the user
    // add the user to the request object

    return handler.handle();
  }
}
