import { Module } from '@nestjs/common';

import { RateUpdateCroneService } from './crones/rate-update.crone.service';
import { CarBrandRepository } from './services/car-brand-repository.service';
import { CarModelRepository } from './services/car-model-repository.service';
import { CarRepository } from './services/car-repository.service';
import { RateRepository } from './services/rate-repository.service';
import { RefreshTokenRepository } from './services/refresh-token-repository.service';
import { ShowChosenRepository } from './services/show-chosen-repository.service';
import { ShowListRepository } from './services/show-list-repository.service';
import { UserRepository } from './services/user-repository.service';

@Module({
  providers: [
    CarBrandRepository,
    RefreshTokenRepository,
    ShowChosenRepository,
    ShowListRepository,
    UserRepository,
    RateRepository,
    CarRepository,
    CarModelRepository,
    RateUpdateCroneService,
  ],
  exports: [
    CarBrandRepository,
    RefreshTokenRepository,
    ShowChosenRepository,
    ShowListRepository,
    UserRepository,
    RateRepository,
    CarRepository,
    CarModelRepository,
  ],
})
export class RepositoryModule {}
