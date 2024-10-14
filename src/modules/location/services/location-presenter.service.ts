import { Injectable } from '@nestjs/common';

import { LocationEntity } from '../../../database/entities/location.entity';
import { LocationResDto } from '../dto/res/location.res.dto';

@Injectable()
export class LocationPresenterService {
  public toResponseDto({ city, region }: LocationEntity): LocationResDto {
    return {
      city,
      region,
    };
  }
}
