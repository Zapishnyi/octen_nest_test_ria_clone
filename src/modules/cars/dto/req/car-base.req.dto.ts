import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';
import { CurrencyEnum } from '../../enums/currency.enum';

export class CarBaseReqDto {
  @IsString()
  @Length(1, 20)
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description:
      'Only brands from provided list permitted, contact administration if yours missing',
    example: 'BMW',
  })
  brand: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description:
      'Only models from provided list permitted, contact administration if yours missing',
    example: '325xi',
  })
  model: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description:
      'Only cities from provided list permitted, contact administration if yours missing',
    example: 'Lviv',
  })
  city: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(400000)
  @ApiProperty({
    example: 30000,
  })
  mileage: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1950)
  @Max(new Date().getFullYear())
  @ApiProperty({
    example: 2023,
  })
  build: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(10000000)
  @ApiProperty({
    example: 30000,
  })
  price: number;

  @IsNotEmpty()
  @IsEnum(CurrencyEnum)
  @ApiProperty({
    example: CurrencyEnum.USD,
  })
  currency: CurrencyEnum;
}
