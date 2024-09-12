import { PickType } from '@nestjs/swagger';

import { UserBaseResDto } from './user-base.res.dto';

export class UserResDto extends PickType(UserBaseResDto, [
  'id',
  'first_name',
  'last_name',
  'email',
  'phone',
  'role',
  'avatar_image',
  'created',
  'updated',
]) {}
