import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { FetchUserInterceptor } from './interceptors/fetch-user.interceptor';
import { AuthenticateAccessMiddleware } from './middlewares/authenticate-access.middleware';

declare global{
  namespace Express{
    interface Request{
      userId?: number;
      currentUser: User;
    }
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [
    AuthService,
    FetchUserInterceptor,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthenticateAccessMiddleware).forRoutes('*')
  }
}
