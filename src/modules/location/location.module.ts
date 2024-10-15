import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { RepositoryModule } from '../repository/repository.module';
import { LocationController } from './location.controller';
import { LocationService } from './services/location.service';
import { LocationPresenterService } from './services/location-presenter.service';

@Module({
  imports: [RepositoryModule, forwardRef(() => AuthModule)],
  providers: [LocationService, LocationPresenterService],
  exports: [LocationService],
  controllers: [LocationController],
})
export class LocationModule {}
