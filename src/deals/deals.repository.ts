import { Point } from 'geojson';
import { EntityRepository, Repository } from 'typeorm';
import { Deal } from './deal.entity';
import * as wkx from 'wkx';
import { InternalServerErrorException } from '@nestjs/common';
@EntityRepository(Deal)
export class DealsRepository extends Repository<Deal> {
  async searchDeals(term: string, location?: Point): Promise<Deal[]>{
    const query = this.createQueryBuilder('deal');
    query.where(`(${this.titleContainsTerm} OR ${this.descriptionContainsTerm})`, {title: term, description: term});

    if(location){
        const wkt_location = wkx.Point.parseGeoJSON(location).toWkt();
        query.andWhere(this.nearbyLocation, {location: wkt_location});
    }

    try{
        const deals = await query.getMany()
        return deals;
    }catch(err){
        throw new InternalServerErrorException();
    }
  }

  private titleContainsTerm(): string {
    return 'LOWER(deal.title) LIKE LOWER(:title)';
  }

  private descriptionContainsTerm(): string {
    return 'LOWER(deal.description) LIKE LOWER(:description)';
  }

  private nearbyLocation(): string {
    return `${this.distanceToLocation} <= 10000`; // TO-DO: aquire form config
  }

  private distanceToLocation(): string {
    return 'ST_DISTANCE_SPHERE( deal.location , ST_GEOMFROM_TEXT(:location))';
  }
}
