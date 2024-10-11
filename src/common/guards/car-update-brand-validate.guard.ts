import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { CarBrandEntity } from '../../database/entities/car-brand.entity';
import { CarModelEntity } from '../../database/entities/car-model.entity';
import { CarUpdateReqDto } from '../../modules/cars/dto/req/car-update.req.dto';
import { CarBrandRepository } from '../../modules/repository/services/car-brand-repository.service';

@Injectable()
export class CarUpdateBrandValidateGuard implements CanActivate {
  constructor(private readonly carBrandRepository: CarBrandRepository) {}

  async canActivate(
    context: ExecutionContext /* give access to current request data*/,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const dto = request['body'] as CarUpdateReqDto;
    let brand: CarBrandEntity[] = [];
    let model: CarModelEntity[] = [];
    if ((dto.brand && !dto.model) || (!dto.brand && dto.model)) {
      throw new BadRequestException(
        'Brand should be changed together with model mention',
      );
    }
    if (dto.brand) {
      brand = (
        await this.carBrandRepository.getBradsModels({
          search_brand: dto.brand,
          models: true,
          page: 1,
          limit: 1,
        })
      )[0];
      if (!brand.length) {
        throw new BadRequestException(
          'Brand is not comply with provided car brand/models list',
        );
      }
    }
    if (dto.model) {
      model = brand[0].models?.filter(
        (model: CarModelEntity) => model.name === dto.model,
      );
      if (!model.length) {
        throw new BadRequestException(
          'Model is not comply with provided car brand/models list',
        );
      }
    }

    request.brand_data = {
      brand: brand[0],
      model: model[0],
    };

    return true;
  }
}
