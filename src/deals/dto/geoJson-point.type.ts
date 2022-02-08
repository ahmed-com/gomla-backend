import { Matches, IsNumber } from 'class-validator';

export class GeoJsonPoint {
  @Matches(/^Point$/)
  type: 'Point';

  @IsNumber({}, { each: true })
  coordinates: [number, number];
}
