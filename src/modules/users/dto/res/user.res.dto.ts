import { PickType } from '@nestjs/swagger';

import { UserBaseResDto } from './user-base.res.dto';

export class UserResDto extends PickType(UserBaseResDto, [
  'first_name',
  'last_name',
  'id',
  'email',
  'phone',
  'plan',
  'role',
  'avatar_image',
  'verify',
  'created',
  'updated',
]) {
  // @ApiProperty({ format: 'uuid' })
  // public readonly id: string;
  //
  // @ApiProperty({
  //   description: 'Users first name',
  // })
  // public readonly first_name: string;
  //
  // @ApiProperty({
  //   description: 'Users last name',
  //   example: 'Doe',
  // })
  // public readonly last_name: string;
  //
  // @ApiProperty({ example: 'customer@gmail.com' })
  // public readonly email: string;
  //
  // @ApiProperty({ example: 'Csfe4354D$' })
  // public readonly password?: string;
  //
  // @ApiProperty({
  //   description: 'User phone number',
  //   example: '+30888888888',
  // })
  // public readonly phone: string;
  //
  // public readonly role: AdminRoleEnum;
  // public readonly plan: UserPlanEnum;
  // public readonly verify: boolean;
  //
  // public readonly avatar_image?: string;
  //
  // public readonly created: Date;
  //
  // public readonly updated: Date;
}
