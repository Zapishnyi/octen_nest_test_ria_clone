import { ApiProperty } from '@nestjs/swagger';

import { CarModelResDto } from './car-model-base.req.dto';

export class CarBrandBaseResDto {
  @ApiProperty({ format: 'uuid' })
  public readonly id: string;

  @ApiProperty({ type: 'string', example: 'BMW' })
  public readonly brand: string;

  public readonly created: Date;

  public readonly updated: Date;

  public readonly models?: CarModelResDto[];

  public readonly cars?: CarModelResDto[];
}
