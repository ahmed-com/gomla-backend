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
      // extract the JWT from the request header as bearer token if found
      // use the auth service to validate the JWT and attach the userId to the request if successful
  
      return handler.handle();
    }
  }
  