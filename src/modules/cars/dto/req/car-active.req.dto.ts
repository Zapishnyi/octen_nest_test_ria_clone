import { PickType } from '@nestjs/swagger';

import { CarBaseReqDto } from './car-base.req.dto';

export class CarActiveReqDto extends PickType(CarBaseReqDto, [
  'brand',
  'description',
  'build',
  'city',
  'currency',
  'mileage',
  'model',
  'price',
  'active',
]) {}
