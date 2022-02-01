import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from './interfaces/access-token-payload.interface';
import { UsersRepository } from './users.repository';
import {User} from './user.entity'
import { publicKey } from 'src/utils/getKeys';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      secretOrKey: publicKey,
      ignoreExpiration: false,
      algorithms: ['RS256'],
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: AccessTokenPayload): Promise<User> {
    console.log(payload)
    const id = payload.sub;

    const user: User = await this.usersRepository.findOne(id);

    if (!user) throw new UnauthorizedException();

    if (user.revocationDeadline > payload.iat) throw new UnauthorizedException();

    return user;
  }
}
