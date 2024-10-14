import { PickType } from '@nestjs/swagger';

import { CarModelBaseResDto } from './car-model-base.res.dto';

export class CarModelResDto extends PickType(CarModelBaseResDto, ['model']) {}
