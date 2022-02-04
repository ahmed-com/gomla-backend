import { Expose } from "class-transformer";

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    accessToken: string;

    @Expose()
    accessTokenExp: number;

    @Expose()
    username?: string;

    @Expose()
    email?: string;
    
    @Expose()
    avatar?: string;
}