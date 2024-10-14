import { PickType } from '@nestjs/swagger';

import { CarBaseReqDto } from './car-base.req.dto';

export class CarReqDto extends PickType(CarBaseReqDto, [
  'brand',
  'description',
  'build',
  'city',
  'currency',
  'mileage',
  'model',
  'price',
]) {}
