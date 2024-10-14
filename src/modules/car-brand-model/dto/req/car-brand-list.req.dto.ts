import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

import { CarBrandModelReqDto } from './car-brand-model.req.dto';

export class CarBrandListReqDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => CarBrandModelReqDto)
  @ApiProperty({
    description: 'list of car brands you want to upload',
  })
  public readonly brandList: CarBrandModelReqDto[];
}
