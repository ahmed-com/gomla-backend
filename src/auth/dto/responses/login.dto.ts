import { Expose } from "class-transformer";

export class LoginDto {
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