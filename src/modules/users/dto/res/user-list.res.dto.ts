import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { UserPlanEnum } from '../../enums/user-plan.enum';
import { UserListItemResDto } from './user-list-item.res.dto';

export class UserListResDto {
  @ApiProperty({
    example: UserListItemResDto,
    description: 'List of users as per query',
  })
  data: UserListItemResDto[];

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
  search?: string;

  @ApiProperty({
    example: 'user',
    description: 'Search by user role ',
  })
  @IsOptional()
  role?: string;

  @ApiProperty({
    enum: UserPlanEnum,
    example: 'base',
    description: 'Search by user plan ',
  })
  @IsOptional()
  plan?: UserPlanEnum;

  @IsOptional()
  user_id: string;

  @IsOptional()
  car_id: string;
}
