import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import {Deal} from './deal.model';
import { SearchDealsFilterDto } from './dto/search-deals-filter.dto';

@Controller('deals')
export class DealsController {
  constructor(private dealsService: DealsService) {}

  @Get()
  getDeals(@Query() searchDealsFilterDto: SearchDealsFilterDto): Promise<Deal[]> {
    return this.dealsService.searchDeals() || this.dealsService.getDefaultDeals();
  }

  @Get('/:id')
  getDeal(@Param('id') id: number) {
    return this.dealsService.getDeal();
  }

  @Post()
  createDeal(@Body() createDealDto: CreateDealDto):Deal {
    return this.dealsService.createDeal(createDealDto);
  }

  @Patch('/:id')
  editDeal() {
    return this.dealsService.editDeal();
  }

  @Delete('/:id')
  deleteDeal() {
    return this.dealsService.deleteDeal();
  }
}
