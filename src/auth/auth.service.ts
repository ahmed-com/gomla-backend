import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async registerUser(registerDto: RegisterDto): Promise<User> {
    const { username, password, email } = registerDto;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password,salt);

    const user = await this.usersRepository.createUser(username,passwordHash,email);
    return user;
  }

  async login(loginDto: LoginDto): Promise<User>{
    const {username, password} = loginDto;

    const user = await this.usersRepository.findOne({username});

    const isVerified = await bcrypt.compare(password, user.passwordHash);

    // check for old password

    if(user && isVerified){
      return user;
    }else{
      throw new UnauthorizedException();
    }
  }
}
