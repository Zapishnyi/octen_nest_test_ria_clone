import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { CarReqDto } from '../../modules/cars/dto/req/car.req.dto';
import { CarBrandRepository } from '../../modules/repository/services/car-brand-repository.service';

@Injectable()
export class BrandValidateGuard implements CanActivate {
  constructor(private readonly carBrandRepository: CarBrandRepository) {}

  async canActivate(
    context: ExecutionContext /* give access to current request data*/,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const dto = request['body'] as CarReqDto;
    const brand = await this.carBrandRepository.findBy({ brand: dto.brand });
    if (!brand.length) {
      throw new BadRequestException(
        'Brand is not comply with provided car brand list',
      );
    }
    request.brand_data = {
      brandId: brand[0].id,
    };
    return true;
  }
}
