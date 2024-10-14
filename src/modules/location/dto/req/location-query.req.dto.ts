import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';

export class LocationQueryReqDto {
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @Transform(TransformHelper.trimArray)
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ example: ['Odesa', 'Rivne'] })
  locations?: string[];
}
