import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';

export class CarModelListReqDto {
  @IsNotEmpty()
  @IsString()
  @Length(0, 20)
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Brand assigned to corresponding models',
    example: 'BMW',
  })
  public readonly brand: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Length(0, 20, { each: true })
  @Transform(TransformHelper.trimArray)
  @ApiProperty({
    description: 'list of car models you want to upload',
    example: ['S5', 'S3'],
  })
  public readonly modelList: string[];
}
