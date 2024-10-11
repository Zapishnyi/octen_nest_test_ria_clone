import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  Validate,
  ValidateIf,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';
import { CurrencyEnum } from '../../enums/currency.enum';
import { OrderEnum } from '../../enums/order.enum';
import { OrderByEnum } from '../../enums/order-by.enum';
import { IsMaxBuild } from '../custom_validators/isMaxBuild';
import { IsMaxMileage } from '../custom_validators/isMaxMileage';
import { IsMaxPrise } from '../custom_validators/isMaxPrice';
import { IsMinBuild } from '../custom_validators/isMinBuild';
import { IsMinMileage } from '../custom_validators/isMinMileage';
import { IsMinPrise } from '../custom_validators/isMinPrice';

export class CarQueryReqDto {
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

  @Transform(TransformHelper.trim)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Sorted order',
    default: OrderEnum.ASC,
  })
  order: OrderEnum;

  @Transform(TransformHelper.trim)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Sorted by ...',
    default: OrderByEnum.PRICE_CALCULATED,
  })
  orderBy: OrderByEnum;

  @IsOptional()
  @Length(1, 20)
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description:
      'Only brands from provided list permitted, contact administration if yours missing',
  })
  brand?: string;

  // @ValidateIf((dto) => dto.brand !== undefined)
  @IsOptional()
  @IsString()
  @Length(1, 20)
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description:
      'Only models from provided list permitted, contact administration if yours missing',
  })
  model?: string;

  @IsOptional()
  @IsString()
  @Length(1, 30)
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description:
      'Only provided locations are permitted, contact administrator if yours is missing',
    example: 'Odesa',
  })
  city?: string;

  @IsOptional()
  @IsString()
  @Length(1, 30)
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description:
      'Only provided locations are permitted, contact administrator if yours is missing',
    example: 'Odeska Oblast',
  })
  area?: string;

  @Validate(IsMinMileage)
  @Transform(TransformHelper.toNumber)
  @ValidateIf((dto) => dto.mileage_max !== undefined)
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(400000)
  mileage_min?: number;

  @Validate(IsMaxMileage)
  @Transform(TransformHelper.toNumber)
  @ValidateIf((dto) => dto.mileage_min !== undefined)
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(400000)
  mileage_max?: number;

  @Validate(IsMinBuild)
  @Transform(TransformHelper.toNumber)
  @ValidateIf((dto) => dto.build_max !== undefined)
  @IsOptional()
  @IsNumber()
  @Min(1950)
  @Max(new Date().getFullYear())
  build_min?: number;

  @Validate(IsMaxBuild)
  @Transform(TransformHelper.toNumber)
  @ValidateIf((dto) => dto.build_min !== undefined)
  @IsOptional()
  @IsNumber()
  @Min(1950)
  @Max(new Date().getFullYear())
  build_max?: number;

  @ValidateIf(
    (dto) => dto.currency !== undefined && dto.price_max !== undefined,
  )
  @Transform(TransformHelper.toNumber)
  @Validate(IsMinPrise)
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10000000)
  price_min?: number;

  @ValidateIf(
    (dto) => dto.currency !== undefined && dto.price_min !== undefined,
  )
  @Validate(IsMaxPrise)
  @Transform(TransformHelper.toNumber)
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10000000)
  price_max?: number;

  @IsOptional()
  @IsEnum(CurrencyEnum)
  @ApiProperty({
    default: CurrencyEnum.UAH,
  })
  currency: CurrencyEnum;
}
