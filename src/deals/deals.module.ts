import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DealsController } from './deals.controller';
import { DealsRepository } from './deals.repository';
import { DealsService } from './deals.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([DealsRepository]),
    AuthModule,
  ],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
