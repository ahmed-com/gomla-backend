import * as wkx from 'wkx';
import { Point } from 'geojson';
import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';

export class GeoJsonTransformer implements ValueTransformer {
  to(geojson: Point): string {
    console.log(geojson)
    return wkx.Geometry.parseGeoJSON(geojson).toWkt();
  }

  from(wkb: string): Record<string, any> | undefined {
    if (!wkb) return;
    console.log(wkb)
    return wkx.Geometry.parse(wkb).toGeoJSON();
  }
}
