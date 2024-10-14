import { PartialType, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';
import { UserPlanEnum } from '../../enums/user-plan.enum';
import { AdminRoleEnum } from '../../enums/user-role.enum';
import { UserBaseReqDto } from './user-base.req.dto';

export class UserUpdateByAdminReqDto extends PartialType(
  PickType(UserBaseReqDto, ['first_name', 'last_name', 'phone']),
) {
  @IsString()
  @IsOptional()
  @IsEnum(AdminRoleEnum)
  @Transform(TransformHelper.trim)
  public readonly role?: AdminRoleEnum;

  @IsString()
  @IsEnum(UserPlanEnum, {
    message: 'Plan must be one of the following values:base,premium',
  })
  @Transform(TransformHelper.trim)
  @IsOptional()
  public readonly plan?: UserPlanEnum;

  @IsBoolean()
  @IsOptional()
  @Transform(TransformHelper.trim)
  public readonly ban?: boolean;
}
