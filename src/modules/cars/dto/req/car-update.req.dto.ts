import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';
import { CurrencyEnum } from '../../enums/currency.enum';
import { CarBaseReqDto } from './car-base.req.dto';

export class CarUpdateReqDto extends PartialType(
  PickType(CarBaseReqDto, ['build', 'city', 'mileage', 'description']),
) {
  @ValidateIf((object) => object.model !== undefined, {
    message: 'Model name is missing',
  })
  @IsString()
  @Length(1, 20)
  @IsNotEmpty({
    message: 'Brand name is missing',
  })
  @Transform(TransformHelper.trim)
  @IsOptional()
  @ApiProperty({
    description:
      'Only brands from provided list permitted, contact administration if yours missing',
    example: 'BMW',
  })
  brand?: string;

  @ValidateIf((object) => object.brand !== undefined, {
    message: 'Brand is missing',
  })
  @IsNotEmpty({
    message: 'Model name is missing',
  })
  @IsString()
  @Length(1, 20)
  @Transform(TransformHelper.trim)
  @IsOptional()
  @ApiProperty({
    description:
      'Only models from provided list permitted, contact administration if yours missing',
    example: 'S3',
  })
  model?: string;

  @ValidateIf((object) => object.currency !== undefined, {
    message: 'Currency name is missing',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10000000)
  @IsOptional()
  @ApiProperty({
    example: 30000,
  })
  price?: number;

  @ValidateIf((object) => object.price !== undefined, {
    message: 'Price name is missing',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsEnum(CurrencyEnum)
  @IsOptional()
  @ApiProperty({
    example: CurrencyEnum.USD,
  })
  currency?: CurrencyEnum;
}
