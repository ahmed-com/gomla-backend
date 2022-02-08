import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsLatitude,
  IsLongitude,
  IsOptional,
} from 'class-validator';
import { IsLettersAndNumbers } from 'src/validators/isLettersAndNumbers.validator';

export class SearchDealsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsLettersAndNumbers()
  term?: string;

  @IsOptional()
  @IsLatitude()
  lat?: number;

  @IsOptional()
  @IsLongitude()
  lng?: number;
}
