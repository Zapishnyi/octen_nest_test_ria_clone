import { Module } from '@nestjs/common';

import { CarBrandRepository } from './services/car_brand_repository.service';
import { RefreshTokenRepository } from './services/refresh_token_repository.service';
import { ShowChosenRepository } from './services/show_chosen_repository.service';
import { ShowListRepository } from './services/show_list_repository.service';
import { UserRepository } from './services/user_repository.service';

@Module({
  providers: [
    CarBrandRepository,
    RefreshTokenRepository,
    ShowChosenRepository,
    ShowListRepository,
    UserRepository,
  ],
  exports: [
    CarBrandRepository,
    RefreshTokenRepository,
    ShowChosenRepository,
    ShowListRepository,
    UserRepository,
  ],
})
export class RepositoryModule {}
