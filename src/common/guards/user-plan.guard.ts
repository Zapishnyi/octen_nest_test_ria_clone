import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserPlanEnum } from '../../modules/users/enums/user-plan.enum';
import { AdminRoleEnum } from '../../modules/users/enums/user-role.enum';

@Injectable()
export class UserPlanGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = context.switchToHttp().getRequest().user_data.user;
    if (
      user.role !== AdminRoleEnum.MANAGER ||
      AdminRoleEnum.ADMIN ||
      user.plan !== UserPlanEnum.PREMIUM
    ) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
