import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CarBrandResDto } from './car-brand.res.dto';

export class CarBrandListResDto {
  @ApiProperty({
    example: CarBrandResDto,
    description: 'List of car brands as per query',
  })
  data: CarBrandResDto[];

  @ApiProperty({
    example: '300',
    description: 'Total quantity of users as per query',
  })
  total: number;

  @ApiProperty({
    example: '5',
    description: 'Quantity of users on each page',
  })
  limit: number;

  @ApiProperty({
    example: '1',
    description: 'Current page',
  })
  page: number;

  @ApiProperty({
    example: '1',
    description: 'Total pages',
  })
  pages: number;

  @ApiProperty({
    example: 'some@email.com',
    description: 'Search any information related to user ',
  })
  @IsOptional()
  search_brand?: string;

  @ApiProperty({
    description: 'Is models included in search ',
  })
  @IsOptional()
  models?: boolean;
}
