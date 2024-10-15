import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';

export class CarBrandListReqDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Length(0, 20, { each: true })
  @Transform(TransformHelper.trimArray)
  @ApiProperty({
    description: 'list of car brands you want to upload',
    example: ['BMW', 'Audi'],
  })
  public readonly brandList: string[];
}
