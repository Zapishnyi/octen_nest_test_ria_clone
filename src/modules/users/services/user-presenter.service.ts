import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../database/entities/user.entity';
import { UserResDto } from '../dto/res/user.res.dto';

@Injectable()
export class UserPresenterService {
  public toResponseDto(user: UserEntity): UserResDto {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar_image: user.avatar_image,
      created: user.created,
      updated: user.updated,
    };
  }
}
