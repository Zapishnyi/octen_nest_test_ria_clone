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
    const [brand] = await this.carBrandRepository.getBradsModels({
      search_brand: dto.brand,
      models: true,
      page: 1,
      limit: 1,
    });
    const model =
      brand[0].models?.filter((model) => model.name === dto.model) || [];

    if (!brand.length || !model.length) {
      throw new BadRequestException(
        'Brand/model is not comply with provided car brand/models list',
      );
    }
    request.brand_data = {
      brand: brand[0],
      model: model[0],
    };
    return true;
  }
}
