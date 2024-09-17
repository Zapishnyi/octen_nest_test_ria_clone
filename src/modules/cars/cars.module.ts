import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CarBrandModelModule } from '../car-brand-model/car-brand-model.module';
import { RepositoryModule } from '../repository/repository.module';
import { UsersModule } from '../users/users.module';
import { CarsController } from './cars.controller';
import { CarsService } from './services/cars.service';

@Module({
  imports: [AuthModule, RepositoryModule, UsersModule, CarBrandModelModule],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}
