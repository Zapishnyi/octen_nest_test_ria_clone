import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';
import { UserPlanEnum } from '../../enums/user-plan.enum';
import { UserBaseReqDto } from './user-base.req.dto';

export class UserUpdateReqDto extends PartialType(
  PickType(UserBaseReqDto, ['first_name', 'last_name', 'phone']),
) {
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

  @IsBoolean()
  @IsOptional()
  @Transform(TransformHelper.trim)
  public readonly ban?: boolean;
}
