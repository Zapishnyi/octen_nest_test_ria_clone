import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';
import { AdminRoleEnum } from '../../enums/user-role.enum';
import { UserBaseReqDto } from './user-base.req.dto';

export class UserSelfCreateReqDto extends PickType(UserBaseReqDto, [
  'first_name',
  'last_name',
  'email',
  'password',
  'phone',
  'plan',
]) {
  @IsString()
  @IsEnum(AdminRoleEnum, {
    message: 'Role must be one of the following values:user,manager,admin',
  })
  @Transform(TransformHelper.trim)
  @ApiProperty({
    enum: AdminRoleEnum,
    default: AdminRoleEnum.USER,
  })
  public readonly role: AdminRoleEnum;
}
