import {
  IsIn,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsLettersAndNumbers } from 'src/validators/isLettersAndNumbers.validator';
import { IsValidCharacters } from 'src/validators/isValidCharacters.validator';
import currenciesObj from 'src/config/currencies';
import { IsValidPrice } from 'src/validators/isValidPrice.validator';
import { IsValidBuyingDate } from 'src/validators/isValidBuyindDate.validator';
const currencies = Object.keys(currenciesObj);

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

  @IsValidPrice({message: 'not valid price'})
  expected_price: number;

  @IsIn(currencies)
  currency: string;

  @IsValidBuyingDate({message: 'not valid date'})
  buyingDate: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsLettersAndNumbers()
  expected_vendor: string;

  @IsNotEmpty()
  @IsLatitude()
  lat: number;

  @IsNotEmpty()
  @IsLongitude()
  lng: number;
}
