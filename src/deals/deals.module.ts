import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealsController } from './deals.controller';
import { DealsRepository } from './deals.repository';
import { DealsService } from './deals.service';

@Module({
  imports: [TypeOrmModule.forFeature([DealsRepository])],
  controllers: [DealsController],
  providers: [DealsService]
})
export class DealsModule {}
