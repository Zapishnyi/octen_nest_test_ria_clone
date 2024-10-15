import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

import { LocationReqDto } from './location.req.dto';

export class LocationListReqDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true }) // Validates each element in the array
  @Type(() => LocationReqDto) // Ensures that each element is transformed into LocationReqDto
  locations: LocationReqDto[];
}
