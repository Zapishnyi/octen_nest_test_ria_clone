import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';

export class GetBrandsModelsQueryReqDto {
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  @ApiProperty()
  limit: number = 10;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty()
  page: number = 1;

  @ApiProperty({ default: false, nullable: false })
  @Transform(TransformHelper.toBoolean)
  @IsOptional()
  models?: boolean;

  @IsString()
  @IsOptional()
  @Transform(TransformHelper.trim)
  @ApiProperty()
  search_brand?: string;
}
