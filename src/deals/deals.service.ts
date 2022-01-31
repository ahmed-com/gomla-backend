import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deal } from './deal.entity';
import { DealsRepository } from './deals.repository';
import { CreateDealDto } from './dto/create-deal.dto';

@Injectable()
export class DealsService {
    constructor(
        @InjectRepository(DealsRepository)
        private dealsRepository: DealsRepository
    ){}

    async searchDeals():Promise<Deal[]>{
        return [new Deal()]
    }

    async getDefaultDeals():Promise<Deal[]>{
        return [new Deal()]
    }

    async getDeal(){}

    async createDeal(createDealDto: CreateDealDto):Promise<Deal>{
        return new Deal()
    }

    async editDeal(){}

    async deleteDeal(){}
}
