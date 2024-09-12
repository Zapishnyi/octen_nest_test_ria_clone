import { PickType } from '@nestjs/swagger';

import { BaseUserAuthReqDto } from './base-user-auth.req.dto';

export class UserSingInReqDto extends PickType(BaseUserAuthReqDto, [
  'email',
  'password',
]) {}
