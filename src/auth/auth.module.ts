import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import {publicKey, privateKey} from '../utils/getKeys'
import { FetchUserInterceptor } from './interceptors/fetch-user.interceptor';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      verifyOptions: {
        algorithms: ['RS256']
      },
      privateKey,
      publicKey,
      signOptions: {
        expiresIn: 30,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, FetchUserInterceptor],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}