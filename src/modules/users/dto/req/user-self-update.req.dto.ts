import { PartialType, PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from './user-base.req.dto';

export class UserSelfUpdateReqDto extends PartialType(
  PickType(UserBaseReqDto, ['first_name', 'last_name', 'phone']),
) {}
