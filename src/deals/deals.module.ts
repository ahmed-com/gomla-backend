import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealsController } from './deals.controller';
import { DealsRepository } from './deals.repository';
import { DealsService } from './deals.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([DealsRepository])],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
