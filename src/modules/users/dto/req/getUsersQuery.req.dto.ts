import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';
import { UserPlanEnum } from '../../enums/user-plan.enum';
import { AdminRoleEnum } from '../../enums/user-role.enum';

export class GetUsersQueryReqDto {
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  limit: number = 10; /*default value*/

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1; /*default value*/

  @IsString()
  @IsOptional()
  @IsEnum(AdminRoleEnum)
  role?: AdminRoleEnum;

  @IsString()
  @IsOptional()
  @IsEnum(UserPlanEnum)
  plan?: UserPlanEnum;

  @IsString()
  @IsOptional()
  @Transform(TransformHelper.trim)
  @IsUUID()
  user_id?: string;

  @IsString()
  @IsOptional()
  @Transform(TransformHelper.trim)
  @IsUUID()
  car_id?: string;

  @IsString()
  @IsOptional()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  search?: string;
}
