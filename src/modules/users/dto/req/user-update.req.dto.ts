import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';
import { UserPlanEnum } from '../../enums/user-plan.enum';
import { AdminRoleEnum } from '../../enums/user-role.enum';
import { UserBaseReqDto } from './user-base.req.dto';

export class UserUpdateReqDto extends PartialType(
  PickType(UserBaseReqDto, [
    'first_name',
    'last_name',
    'phone',
    'avatar_image',
  ]),
) {
  @IsString()
  @IsEnum(AdminRoleEnum, {
    message:
      'Role must be one of the following values: user, manager, admin.' +
      ' Available for admin rights user only ',
  })
  @IsOptional()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @ApiProperty({
    default: AdminRoleEnum.USER,
  })
  public readonly role?: AdminRoleEnum;

  @IsString()
  @IsEnum(UserPlanEnum, {
    message: 'Plan must be one of the following values:base, premium',
  })
  @IsOptional()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    enum: UserPlanEnum,
    default: UserPlanEnum.BASE,
  })
  public readonly plan?: UserPlanEnum;
}
