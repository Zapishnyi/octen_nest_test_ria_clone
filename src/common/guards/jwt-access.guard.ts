import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { TokenTypeEnum } from '../../modules/auth/enums/token-type.enum';
import { AuthAccessService } from '../../modules/auth/services/auth-access.service';
import { TokenService } from '../../modules/auth/services/token.service';
import { UserRepository } from '../../modules/repository/services/user-repository.service';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly authAccessService: AuthAccessService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const skipAuth = this.reflector.getAllAndOverride<boolean>('SKIP_AUTH', [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);
    // if (skipAuth) return true;

    const request = context.switchToHttp().getRequest();
    const access = request.get('Authorization')?.split(' ').pop();

    if (!access) {
      throw new UnauthorizedException();
    }

    const { userId, device } = await this.tokenService.verifyToken(
      access,
      TokenTypeEnum.ACCESS,
    );
    if (!userId) {
      throw new UnauthorizedException();
    }

    const accessTokenExist = await this.authAccessService.isAccessTokenExist(
      userId,
      device,
      access,
    );
    if (!accessTokenExist) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    request.user_data = {
      user,
      device,
    };
    return true;
  }
}
