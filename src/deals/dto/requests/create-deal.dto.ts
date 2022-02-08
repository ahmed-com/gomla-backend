import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  MaxDate,
  MaxLength,
  Min,
  MinDate,
  MinLength,
} from 'class-validator';
import { HasValidCoordinates } from 'src/validators/hasValidCoordinates.validator';
import { IsLettersAndNumbers } from 'src/validators/isLettersAndNumbers.validator';
import { IsValidCharacters } from 'src/validators/isValidCharacters.validator';
import { GeoJsonPoint } from '../geoJson-point.type';
import currenciesObj from 'src/config/currencies';
const currencies = Object.keys(currenciesObj);

const maxDate = 10 * 365 * 24 * 60 * 60 * 1000; // 10 years

export class CreateDealDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsLettersAndNumbers()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  @IsValidCharacters()
  description: string;

  @IsNumber()
  @Min(10)
  @Max(1000000)
  expected_price: number;

  @IsIn(currencies)
  currency: string;

  @IsDate()
  @MinDate(new Date(Date.now()))
  @MaxDate(new Date(Date.now() + maxDate))
  buyingDate: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsLettersAndNumbers()
  expected_vendor: string;

  // @IsUrl({},{each: true})
  // imgs: string[];

  @HasValidCoordinates()
  @Type(() => GeoJsonPoint)
  location: GeoJsonPoint;
}
