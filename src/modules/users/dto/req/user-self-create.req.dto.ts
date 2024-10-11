import { PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from './user-base.req.dto';

export class UserSelfCreateReqDto extends PickType(UserBaseReqDto, [
  'first_name',
  'last_name',
  'email',
  'password',
  'phone',
]) {}
