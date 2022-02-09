import { Expose, Type } from "class-transformer";

class UserPublicInfo {
    @Expose()
    id: number;

    @Expose()
    username: string;
}

export class CreateDealResponseDto{
    @Expose()
    id: number;
    
    @Expose()
    title:string;

    @Expose()
    notifNum: number;

    @Expose()
    @Type(()=> UserPublicInfo)
    owner: UserPublicInfo
}