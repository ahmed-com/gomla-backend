import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
import { ConfigService } from '@nestjs/config';
import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private configService: ConfigService
  ) {}

  async registerUser(
    registerDto: RegisterDto,
  ): Promise<{ loginDto: LoginDto, refreshToken: string }> {
    const { username, password, email } = registerDto;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await this.usersRepository.createUser(
      username,
      passwordHash,
      email,
    );

    const accessToken = await this.issueAccessToken(user);
    const refreshToken = await this.issueRefreshToken(user);
    return { 
      refreshToken,
      loginDto: {
        accessToken,
        accessTokenExp: this.configService.get('ACCESS_TOKEN_EXPIRATION'),
        ...user
      }
     };
  }

  async signin(signinDto: SigninDto): Promise<{ loginDto: LoginDto, refreshToken: string }> {
    const { username, password } = signinDto;

    const user = await this.usersRepository.findOne({ username });
    if(!user) throw new UnauthorizedException();

    const isVerified = await bcrypt.compare(password, user.passwordHash);
    if(!isVerified) await this.checkOldPassword(user,password);

    const accessToken = await this.issueAccessToken(user);
    const refreshToken = await this.issueRefreshToken(user);
    return { 
      refreshToken,
      loginDto: {
        accessToken,
        accessTokenExp: this.configService.get('ACCESS_TOKEN_EXPIRATION'),
        ...user
      }
     };
  }

  private async checkOldPassword(user: User, password: string):Promise<never>{
    const isOldPasswordVerified = await bcrypt.compare(password, user.oldPasswordHash);
    if( !isOldPasswordVerified ) throw new UnauthorizedException();

    const passwordAlerPeriod = this.configService.get('PASSWORD_ALERT_PERIOD');
    const passwordUpdatePeriod = Date.now() - (new Date(user.passwordChangeTime)).getTime();
    if(passwordAlerPeriod < passwordUpdatePeriod) throw new UnauthorizedException();

    throw new BadRequestException('You have changed your password recently')
  }

  async fetchUser(id): Promise<User>{
    return this.usersRepository.findOne(id);
  }

  private async issueAccessToken(user: User): Promise<string> {
    return await sign({
      sub: user.id,
    },getKeys().privateKey, {
      algorithm: "RS256",
      expiresIn: this.configService.get("ACCESS_TOKEN_EXPIRATION"),
      subject: `${user.id}`,
    });
  }

  private async issueRefreshToken(user: User): Promise<string> {
    return await sign({
      sub: user.id,
      iat: Date.now(),
    },getKeys().privateKey, {
      algorithm: "RS256",
      expiresIn: ms(this.configService.get("REFRESH_TOKEN_EXPIRATION")),
      subject: `${user.id}`,
    });
  }

  async refreshAccessToken(refreshToken: string): Promise<LoginDto> {
    let payload;
    try{
      payload = await verify(refreshToken,getKeys().publicKey,{
        algorithms: ["RS256"],
        ignoreExpiration: false,
        maxAge: ms(this.configService.get("REFRESH_TOKEN_EXPIRATION"))
      });  
    }catch(err){
      throw new UnauthorizedException();
    }

    const {sub, iat} = payload;
    
    const user = await this.usersRepository.findOne(sub);
    if(!user) throw new UnauthorizedException();

    if(user.revocationDeadline > iat ) throw new UnauthorizedException();

    const accessToken = await this.issueAccessToken(user);

    return {
      id: sub,
      accessToken,
      accessTokenExp: this.configService.get('ACCESS_TOKEN_EXPIRATION'),
    }
  }

  async verifyAccessToken(accessToken: string): Promise<AccessTokenPayload> {
    let payload;
    try{
      payload = await verify(accessToken,getKeys().publicKey,{
        algorithms: ["RS256"],
        ignoreExpiration: false,
        maxAge: this.configService.get("ACCESS_TOKEN_EXPIRATION")
      });  
    }catch(err){
      throw new UnauthorizedException();
    }

    return payload;
  }


  async resetPassword(dto: ResetPasswordDto, user: User): Promise<{loginDto: LoginDto, refreshToken: string}>{
    const {newPassword, oldPassword} = dto;

    const isVerified = await bcrypt.compare(oldPassword, user.passwordHash);
    if(!isVerified) await this.checkOldPassword(user,oldPassword);

    return this.updatePassword(newPassword,user);
  }

  async logoutGlobally(user: User): Promise<void>{
    user.revocationDeadline = Date.now();
    await this.usersRepository.save(user);
  }

  private async updatePassword(newPassword: string, user: User): Promise<{loginDto: LoginDto, refreshToken: string}>{
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);

    user.oldPasswordHash = user.passwordHash;
    user.passwordChangeTime = new Date(Date.now());
    user.revocationDeadline = Date.now();
    user.passwordHash = passwordHash;

    await this.usersRepository.save(user);

    const accessToken = await this.issueAccessToken(user);
    const refreshToken = await this.issueRefreshToken(user);
    return { 
      refreshToken,
      loginDto: {
        accessToken,
        accessTokenExp: this.configService.get('ACCESS_TOKEN_EXPIRATION'),
        ...user
      }
     };
  }
}
