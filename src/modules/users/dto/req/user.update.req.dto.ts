import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

import {
  AdminRoleEnum,
  CustomerRoleEnum,
} from '../../../../common/enums/user-role.enum';
import { TransformHelper } from '../../../../common/helpers/Transform.helper';
import { UserBaseReqDto } from './user-base.req.dto';

export class UserCustomerReqDto extends PickType(UserBaseReqDto, [
  'first_name',
  'last_name',
  'email',
  'phone',
  'avatar',
]) {
  @IsString()
  @IsEnum(CustomerRoleEnum, {
    message: 'Role must be one of the following values:buyer,seller',
  })
  @Transform(TransformHelper.trim)
  @ApiProperty({
    default: CustomerRoleEnum.BUYER,
  })
  public readonly role: AdminRoleEnum;
}
