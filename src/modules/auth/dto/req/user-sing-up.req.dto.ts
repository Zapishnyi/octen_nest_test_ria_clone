import { PickType } from '@nestjs/swagger';

import { BaseUserAuthReqDto } from './base-user-auth.req.dto';

export class UserSingUpReqDto extends PickType(BaseUserAuthReqDto, [
  'email',
  'password',
  'phone',
  'role',
  'first_name',
  'last_name',
]) {}
