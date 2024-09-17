import { Injectable } from '@nestjs/common';

import { CarModelEntity } from '../../../database/entities/car-model.entity';
import { CarModelResDto } from '../dto/res/car-model-base.req.dto';

@Injectable()
export class CarModelPresenterService {
  public toResponseDto(entity: CarModelEntity): CarModelResDto {
    return {
      id: entity.id,
      model: entity.model,
      brandId: entity.brandId,
      created: entity.created,
      updated: entity.updated,
    };
  }
}
