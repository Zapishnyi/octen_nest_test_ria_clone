import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { AwsStorageModule } from '../aws-storage/aws-storage.module';
import { CarBrandModelModule } from '../car-brand-model/car-brand-model.module';
import { RepositoryModule } from '../repository/repository.module';
import { UsersModule } from '../users/users.module';
import { CarsController } from './cars.controller';
import { CarPresenterService } from './services/car-presenter.service';
import { CarsService } from './services/cars.service';

@Module({
  imports: [
    AuthModule,
    RepositoryModule,
    UsersModule,
    CarBrandModelModule,
    AwsStorageModule,
  ],
  controllers: [CarsController],
  providers: [CarsService, CarPresenterService],
  exports: [CarsService],
})
export class CarsModule {}
