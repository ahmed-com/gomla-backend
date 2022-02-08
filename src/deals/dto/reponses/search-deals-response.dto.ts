import { Expose } from "class-transformer";
import { Point } from "geojson";

export default class SearchDealsResponseDto{

    @Expose()
    id: number;

    @Expose()
    title: string;

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
}