import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() registerDto: RegisterDto): Promise<{accessToken: string}> {
    return this.authService.registerUser(registerDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{accessToken: string}>{
    return this.authService.login(loginDto);
  }

  @Post('/test')
  // @UseGuards(AuthGuard())
  test(@Req() req){
    console.log(req);
  }
}
