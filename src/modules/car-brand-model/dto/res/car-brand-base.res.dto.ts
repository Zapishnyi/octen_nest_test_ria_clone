import { ApiProperty } from '@nestjs/swagger';

import { CarResDto } from '../../../cars/dto/res/car.res.dto';

export class CarBrandBaseResDto {
  @ApiProperty({ type: 'string', example: 'BMW' })
  public readonly brand: string;
  @ApiProperty({ type: 'string', format: 'date-time', example: new Date() })
  public readonly created: Date;
  @ApiProperty({ type: 'string', format: 'date-time', example: new Date() })
  public readonly updated: Date;
  @ApiProperty({ type: 'array', example: ['S1'] })
  public readonly models: string[];
  @ApiProperty({ type: [CarResDto] })
  public readonly cars?: CarResDto[];
}
