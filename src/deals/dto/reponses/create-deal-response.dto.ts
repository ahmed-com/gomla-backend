import { Expose } from "class-transformer";

export class CreateDealResponseDto{
    @Expose()
    id: number;
    
    @Expose()
    title:string;

    @Expose()
    notifNum: number;
}