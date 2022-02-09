import * as wkx from 'wkx';
import { Point } from 'geojson';
import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';

export class GeoJsonTransformer implements ValueTransformer {
  to(geojson: Point): string {
    return wkx.Geometry.parseGeoJSON(geojson).toWkt();
  }

  from(wkb: string): Record<string, any> | undefined {
    if (!wkb) return;
    return wkx.Geometry.parse(wkb).toGeoJSON();
  }
}
