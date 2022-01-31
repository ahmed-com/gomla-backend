import { Injectable } from '@nestjs/common';
import { Deal } from './deal.entity';
import { CreateDealDto } from './dto/create-deal.dto';

@Injectable()
export class DealsService {
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
