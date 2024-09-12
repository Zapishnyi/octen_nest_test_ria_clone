import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { AdminRoleEnum } from '../../../../common/enums/user-role.enum';
import { TransformHelper } from '../../../../common/helpers/Transform.helper';

export class UserBaseReqDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Users first name',
    example: 'John',
  })
  public readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Users last name',
    example: 'Doe',
  })
  public readonly last_name: string;

  @IsString()
  @Matches(/^\S+@\S+\.\S+$/, { message: 'Must be a valid e-mail address' })
  @Transform(TransformHelper.trim)
  @ApiProperty({ example: 'customer@gmail.com' })
  public readonly email: string;

  @IsString()
  @Transform(TransformHelper.trim)
  @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, {
    message:
      'Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter,' +
      'one special character, no space, and it must be 8-16 characters long.',
  })
  @ApiProperty({ example: 'Csfe4354D$' })
  public readonly password: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  @Transform(TransformHelper.trim)
  @Matches(/(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/gm, {
    message: 'Please enter valid phone number',
  })
  @ApiProperty({
    description: 'User phone number',
    example: '+381234567000',
  })
  public readonly phone: string;

  @IsString()
  @IsEnum(AdminRoleEnum, {
    message:
      'Role must be one of the following values: buyer, seller, manager, admin',
  })
  @Transform(TransformHelper.trim)
  @ApiProperty({ enum: AdminRoleEnum, default: AdminRoleEnum.BUYER })
  public readonly role: AdminRoleEnum;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'User avatar',
    required: false,
    example: 'path to image',
  })
  public readonly avatar?: string;
}
