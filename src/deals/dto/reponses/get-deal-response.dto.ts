import { Expose, Type } from "class-transformer";
import { Point } from "geojson";

class UserPublicInfo {
    @Expose()
    id: number;

    @Expose()
    username: string;
}

export default class GetDealResponseDto{

    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    expected_vendor: string;

    @Expose()
    buyingDate: Date;

    @Expose()
    expected_price: number;
    
    @Expose()
    currency: string;

    @Expose()
    membersCount: number;

    @Expose()
    location: Point;

    @Expose()
    imgs: string[];

    @Expose()
    @Type(()=> UserPublicInfo)
    owner: UserPublicInfo
}