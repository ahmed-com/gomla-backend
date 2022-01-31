import { IsNotEmpty } from 'class-validator'

export class CreateDealDto {
    @IsNotEmpty()
    title: string;
}