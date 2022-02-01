import { Expose } from "class-transformer";

export class UserDto { // the user public info
    @Expose()
    id: number;

    @Expose()
    username: string;

    @Expose()
    email?: string;
    
    @Expose()
    avatar?: string;
}