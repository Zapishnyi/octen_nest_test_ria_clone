import { PickType } from '@nestjs/swagger';

import { CarBrandBaseResDto } from './car-brand-base.res.dto';

export class CarBrandResDto extends PickType(CarBrandBaseResDto, [
  'brand',
  'models',
]) {}
