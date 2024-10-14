import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';
import { CarImageTypeEnum } from '../../enums/car-image-type.enum';

export class CarImageQueryReqDto {
  @IsEnum(CarImageTypeEnum)
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  image_type: CarImageTypeEnum;
}
