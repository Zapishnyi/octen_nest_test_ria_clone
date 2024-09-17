import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';

export class CarModelListReqDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Length(0, 20, { each: true })
  @Transform(TransformHelper.trimArray)
  @ApiProperty({
    description: 'list of car models you want to upload',
    example: ['S3', 'S4'],
  })
  public readonly modelList: string[];
}
