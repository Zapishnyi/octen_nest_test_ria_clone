import { PickType } from '@nestjs/swagger';

import { LocationBaseResDto } from './location-base.res.dto';

export class LocationResDto extends PickType(LocationBaseResDto, [
  'city',
  'region',
]) {}
