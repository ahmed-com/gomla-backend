import { Point } from 'geojson';
import { EntityRepository, Repository } from 'typeorm';
import { Deal } from './deal.entity';
import * as wkx from 'wkx';
import { InternalServerErrorException } from '@nestjs/common';
import { getMysqlDate } from 'src/utils/getMysqlDate';
import { User } from 'src/auth/user.entity';
@EntityRepository(Deal)
export class DealsRepository extends Repository<Deal> {
  async searchDeals(
    term?: string,
    location?: Point /** ,buyingDate spec, pagination, otherFilters */,
  ): Promise<Deal[]> {
    const query = this.createQueryBuilder('deal').leftJoinAndSelect('deal.owner','owner')
    
    query.where('deal.buyingDate > :now', {
      now: getMysqlDate(Date.now()),
    });

    if (term) {
      query.andWhere(
        `(${this.titleContainsTerm()} OR ${this.descriptionContainsTerm()})`,
        { title: term, description: term },
      );
    }

    if (location) {
      const wkt_location = wkx.Geometry.parseGeoJSON(location).toWkt();
      query.andWhere(this.nearbyLocation(), { location: wkt_location });
      // query.orderBy(this.distanceToLocation()) // orderby doesn't work with prepared statements
    }

    try {
      const deals = await query.getMany();
      return deals;
    } catch (err) {
      console.log(err)
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
    return `${this.distanceToLocation()} <= 10000`; // TO-DO: aquire form config
  }

  private distanceToLocation(): string {
    return 'ST_DISTANCE_SPHERE( deal.location , ST_GeomFromText(:location,4326))';
  }
}
