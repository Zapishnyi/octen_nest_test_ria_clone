import { Injectable } from '@nestjs/common';

import { CarModelEntity } from '../../../../database/entities/car-model.entity';
import { CarModelResDto } from '../../dto/res/car-model.res.dto';

@Injectable()
export class CarModelPresenterService {
  public toResponseDto(entity: CarModelEntity): CarModelResDto {
    return {
      model: entity.name,
    };
  }

  public toString(entity: CarModelEntity): string {
    return entity.name;
  }
}
