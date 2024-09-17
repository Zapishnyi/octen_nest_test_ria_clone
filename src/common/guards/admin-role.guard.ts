import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AdminRoleEnum } from '../../modules/users/enums/user-role.enum';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = context.switchToHttp().getRequest().user_data.user;
    if (user.role !== AdminRoleEnum.ADMIN) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
