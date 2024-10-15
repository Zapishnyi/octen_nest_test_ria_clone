import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { CarReqDto } from '../../modules/cars/dto/req/car.req.dto';
import { LocationRepositoryService } from '../../modules/repository/services/location-repository.service';

@Injectable()
export class LocationValidateGuard implements CanActivate {
  constructor(private readonly locationRepository: LocationRepositoryService) {}

  async canActivate(
    context: ExecutionContext /* give access to current request data*/,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const dto = request['body'] as CarReqDto;
    const locations = await this.locationRepository.getLocations([dto.city]);

    if (!locations.length) {
      throw new BadRequestException(
        'City is not exist in database, please contact administrator',
      );
    }
    request.location_data = {
      location: locations[0],
    };
    return true;
  }
}
