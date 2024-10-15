import { PickType } from '@nestjs/swagger';

import { CarResDto } from './car.res.dto';

export class CarCreateResDto extends PickType(CarResDto, [
  'id',
  'brand',
  'model',
  'build',
  'mileage',
  'image',
  'price_initial',
  'currency_initial',
]) {}
