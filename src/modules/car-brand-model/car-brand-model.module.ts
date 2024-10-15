import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { RepositoryModule } from '../repository/repository.module';
import { CarBrandModelController } from './car-brand-model.controller';
import { CarBrandService } from './services/car-brand.service';
import { CarBrandPresenterService } from './services/car-brand-presenter.service';
import { CarModelService } from './services/to_delete/car-model.service';
import { CarModelPresenterService } from './services/to_delete/car-model-presenter.service';

@Module({
  imports: [RepositoryModule, forwardRef(() => AuthModule)],
  controllers: [CarBrandModelController],
  providers: [
    CarBrandService,
    CarBrandPresenterService,
    CarModelService,
    CarModelPresenterService,
  ],
  exports: [
    CarBrandService,
    CarBrandPresenterService,
    CarModelService,
    CarModelPresenterService,
  ],
})
export class CarBrandModelModule {}
