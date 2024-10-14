import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class BanGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = context.switchToHttp().getRequest().user_data.user;
    if (user.ban) {
      throw new ForbiddenException(
        'This action is forbidden, please contact administrator for details',
      );
    }
    return true;
  }
}
