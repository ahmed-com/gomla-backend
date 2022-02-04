import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/requests/register.dto';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/requests/signin.dto';
import { AccessTokenPayload } from './interfaces/access-token-payload.interface';
import getKeys from 'src/utils/getKeys';
import { ResetPasswordDto } from './dto/requests/reset-password.dto';
import { LoginDto} from './dto/responses/login.dto';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async registerUser(
    registerDto: RegisterDto,
  ): Promise<{ loginDto: LoginDto, refreshToken: string }> {
    // const { username, password, email } = registerDto;

    // const salt = await bcrypt.genSalt();
    // const passwordHash = await bcrypt.hash(password, salt);

    // const user = await this.usersRepository.createUser(
    //   username,
    //   passwordHash,
    //   email,
    // );

    // const accessToken = await this.issueAccessToken(user);
    return { accessToken: '', refreshToken: '' };
  }

  async signin(signinDto: SigninDto): Promise<{ loginDto: LoginDto, refreshToken: string }> {
    // const { username, password } = signinDto;

    // const user = await this.usersRepository.findOne({ username });

    // const isVerified = await bcrypt.compare(password, user.passwordHash);

    // // check for old password

    // if (user && isVerified) {
    //   const accessToken = await this.issueAccessToken(user);
    //   return { accessToken };
    // } else {
    //   throw new UnauthorizedException();
    // }
    return {accessToken : '', refreshToken: ''};
  }

  async issueAccessToken(user: User): Promise<string> {
    return '';
  }

  async issueRefreshToken(user: User): Promise<string> {
    return '';
  }

  async refreshAccessToken(refreshToken: string): Promise<LoginDto> {
    return '';
  }

  async verifyAccessToken(accessToken: string): Promise<AccessTokenPayload> {
    return { sub: 0, iat: 0 };
  }

  async fetchUser(id): Promise<User>{
    return this.usersRepository.findOne(id);
  }

  async resetPassword(dto: ResetPasswordDto, user: User): Promise<{loginDto: LoginDto, refreshToken: string}>{
    return '';
  }

  private async updatePassword(newPassword: string, user: User): Promise<string>{
    return '';
  }
}
