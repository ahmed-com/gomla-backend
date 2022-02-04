import { Body, Controller, Post } from '@nestjs/common';
import { FetchUser } from 'src/decorators/fetch-user.decorator';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/requests/signin.dto';
import { RegisterDto } from './dto/requests/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() registerDto: RegisterDto): Promise<{accessToken: string}> {
    return this.authService.registerUser(registerDto);
  }

  @Post('/signin')
  @FetchUser()
  login(@Body() loginDto: SigninDto): Promise<{accessToken: string}>{
    return this.authService.login(loginDto);
  }
}