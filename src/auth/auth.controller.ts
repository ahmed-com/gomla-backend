import { Body, Controller, Get, Post, Put, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/requests/signin.dto';
import { RegisterDto } from './dto/requests/register.dto';
import { LoginDto } from './dto/responses/login.dto';
import { ResetPasswordDto } from './dto/requests/reset-password.dto';
import { FetchUser } from 'src/decorators/fetch-user.decorator';
import { Serialize } from 'src/decorators/serialize.decorator';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from './user.entity';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { RefreshToken } from './decorators/refresh-token.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('/register')
  @Serialize(LoginDto)
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginDto> {
    const { loginDto, refreshToken } = await this.authService.registerUser(
      registerDto,
    );
    const expireDate =
      new Date(Date.now() + this.configService.get('REFRESH_TOKEN_EXPIRATION'));
    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      sameSite: true,
      secure: this.configService.get('REFRESH_TOKEN_SECURE'),
      expires: expireDate,
    });
    res.cookie('is-auth', true, {
      httpOnly: false,
      sameSite: true,
      secure: this.configService.get('REFRESH_TOKEN_SECURE'),
      expires: expireDate,
    });
    return loginDto;
  }

  @Post('/signin')
  @Serialize(LoginDto)
  async login(
    @Body() signinDto: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginDto> {
    const { loginDto, refreshToken } = await this.authService.signin(signinDto);
    const expireDate =
      new Date(Date.now() + this.configService.get('REFRESH_TOKEN_EXPIRATION'));
    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      sameSite: true,
      secure: this.configService.get('REFRESH_TOKEN_SECURE'),
      expires: expireDate,
    });
    res.cookie('is-auth', true, {
      httpOnly: false,
      sameSite: true,
      secure: this.configService.get('REFRESH_TOKEN_SECURE'),
      expires: expireDate,
    });
    return loginDto;
  }

  @Post('/reset-password')
  @FetchUser()
  @Serialize(LoginDto)
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginDto> {
    const { loginDto, refreshToken } = await this.authService.resetPassword(
      resetPasswordDto,
      user,
    );
    const expireDate =
      new Date(Date.now() + this.configService.get('REFRESH_TOKEN_EXPIRATION'));
    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      sameSite: true,
      secure: this.configService.get('REFRESH_TOKEN_SECURE'),
      expires: expireDate,
    });
    res.cookie('is-auth', true, {
      httpOnly: false,
      sameSite: true,
      secure: this.configService.get('REFRESH_TOKEN_SECURE'),
      expires: expireDate,
    });
    return loginDto;
  }

  @Get('/logout')
  async logout(@Res({ passthrough: true }) res: Response,):Promise<void>{
    res.cookie('refresh-token', '', {
      httpOnly: true,
      sameSite: true,
      secure: this.configService.get('REFRESH_TOKEN_SECURE'),
      expires: new Date(0),
    });
    res.cookie('is-auth', false, {
      httpOnly: false,
      sameSite: true,
      secure: this.configService.get('REFRESH_TOKEN_SECURE'),
      expires: new Date(0),
    });
  }

  @Post('/logout-global')
  @FetchUser()
  async logoutGlobally(@GetUser() user: User):Promise<void>{
    return this.authService.logoutGlobally(user);
  }

  @Get('/refresh-token')
  @Serialize(LoginDto)
  async refreshAccessToken(@RefreshToken() token: string): Promise<LoginDto>{
    return this.authService.refreshAccessToken(token)
  }
}
