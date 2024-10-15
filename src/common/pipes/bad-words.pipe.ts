import { profanity } from '@2toad/profanity';
import { Injectable, PipeTransform } from '@nestjs/common';

import { CarActiveReqDto } from '../../modules/cars/dto/req/car-active.req.dto';

@Injectable()
export class BadWordsPipe implements PipeTransform {
  async transform(value: CarActiveReqDto) {
    value.active = value.description && !profanity.exists(value.description);
    return value;
  }
}
