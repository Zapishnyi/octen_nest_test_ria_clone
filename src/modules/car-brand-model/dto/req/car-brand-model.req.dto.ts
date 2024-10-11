import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';

export class CarBrandModelReqDto {
  @IsNotEmpty()
  @IsString()
  @Length(0, 20)
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Brand assigned to corresponding models',
    example: 'BMW',
  })
  public readonly brand: string;

  @IsNotEmpty({ each: true })
  @IsArray()
  @IsString({ each: true, message: 'Each model must be a string' })
  @ArrayNotEmpty({ message: 'Models array must not be empty' })
  @Length(0, 30, { each: true })
  @Transform(TransformHelper.trimArray)
  @ApiProperty({
    description: 'list of car models you want to upload',
    example: ['S5', 'S3'],
  })
  public readonly models: string[];
}
