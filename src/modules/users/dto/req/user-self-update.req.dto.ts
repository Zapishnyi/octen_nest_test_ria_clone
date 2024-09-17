import { PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from './user-base.req.dto';

export class UserReqDto extends PickType(UserBaseReqDto, [
  'first_name',
  'last_name',
  'email',
  'phone',
  'avatar_image',
]) {}
