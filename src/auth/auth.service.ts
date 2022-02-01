import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from './interfaces/access-token-payload.interface';
import { privateKey } from 'src/utils/getKeys';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async registerUser(
    registerDto: RegisterDto,
  ): Promise<{ accessToken: string }> {
    const { username, password, email } = registerDto;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await this.usersRepository.createUser(
      username,
      passwordHash,
      email,
    );

    const accessToken = await this.issueAccessToken(user);
    return { accessToken };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { username, password } = loginDto;

    const user = await this.usersRepository.findOne({ username });

    const isVerified = await bcrypt.compare(password, user.passwordHash);

    // check for old password

    if (user && isVerified) {
      const accessToken = await this.issueAccessToken(user);
      return { accessToken };
    } else {
      throw new UnauthorizedException();
    }
  }

  private async issueAccessToken(user: User): Promise<string> {
    const sub = user.id;
    const iat = Date.now();
    const payload: AccessTokenPayload = {sub, iat};
    const accessToken = await this.jwtService.signAsync(payload,{privateKey});
    return accessToken;
  }
}
