import {
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    Matches,
  } from 'class-validator';
  
  export class LoginDto {
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @IsNotEmpty()
    @Matches(
      /^[\sa-zA-Z\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF]*$/,
      { message: 'only arabic and latin characters ' },
    )
    username: string;
  
    @IsString()
    @MinLength(8)
    @MaxLength(256)
    @IsNotEmpty()
    @Matches(
      /^[\s0-9a-zA-Z\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF]*$/,
      { message: 'only numbers and arabic and latin characters ' },
    )
    password: string;
  }
  