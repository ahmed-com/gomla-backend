import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from 'geojson';
import { User } from 'src/auth/user.entity';
import { Deal } from './deal.entity';
import { DealsRepository } from './deals.repository';
import { CreateDealDto } from './dto/requests/create-deal.dto';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(DealsRepository)
    private dealsRepository: DealsRepository,
  ) {}

  async searchDeals(
    term?: string,
    location?: Point /** ,buyingDate spec, pagination, otherFilters */,
  ): Promise<Deal[]> {
    if (!term && !location) return this.getDefaultDeals();
    return this.dealsRepository.searchDeals(term, location);
  }

  private async getDefaultDeals(): Promise<Deal[]> {
    return [];
  }

  async getDeal(id: number): Promise<Deal> {
    const deal = await this.dealsRepository.findOne(id);
    if (!deal) throw new NotFoundException();
    return deal;
  }

  async createDeal(
    createDealDto: CreateDealDto & { imgs: string[]; location: Point },
    user: User,
  ): Promise<Deal> {
    const deal = this.dealsRepository.create(createDealDto);
    deal.owner = user;
    deal.membersCount = 0;
    return this.dealsRepository.save(deal);
  }

  async updateDeal(
    id: number,
    userId: number,
    attrs: Partial<Deal>,
  ): Promise<Deal> {
    const deal = await this.getDeal(id);

    if(deal.ownerId != userId) throw new UnauthorizedException();

    Object.assign(deal,attrs);
    return this.dealsRepository.save(deal);
  }

  async deleteDeal(id: number, userId: number): Promise<void> {
    const deal = await this.getDeal(id);

    if(deal.ownerId != userId) throw new UnauthorizedException();

    this.dealsRepository.remove(deal);
  }
}
