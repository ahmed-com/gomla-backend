import { Type } from 'class-transformer';
import { IsDate, IsIn, IsNotEmpty, IsNumber, IsString, IsUrl, Matches, MaxLength, MinLength } from 'class-validator'
import { HasValidCoordinates } from 'src/validators/hasValidCoordinates.validator';
import { IsLettersAndNumbers } from 'src/validators/isLettersAndNumbers.validator';
import { IsValidCharacters } from 'src/validators/isValidCharacters.validator';
const currencies = Object.keys(require("../../config/currencies.json"));

class GeoJsonPoint{
    @Matches(/^Point$/)
    type: "Point";

    @IsNumber({},{each: true})
    coordinates: [number, number];
}

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
    expected_price: number;

    @IsIn(currencies)
    currency: string;

    @IsDate()
    buyingDate: Date;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @IsLettersAndNumbers()
    expected_vendor: string;

    @IsUrl({},{each: true})
    imgs: string[];

    @HasValidCoordinates()
    @Type(()=> GeoJsonPoint)
    location: GeoJsonPoint;
}