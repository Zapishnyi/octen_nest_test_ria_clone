import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { TokenTypeEnum } from '../../modules/auth/enums/token-type.enum';
import { TokenService } from '../../modules/auth/services/token.service';
import { RefreshTokenRepository } from '../../modules/repository/services/refresh-token-repository.service';
import { UserRepository } from '../../modules/repository/services/user-repository.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(
    context: ExecutionContext /* give access to current request data*/,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refresh = request.get('Authorization')?.split(' ').pop();

    if (!refresh) {
      throw new UnauthorizedException();
    }

    const { user_id, device } = await this.tokenService.verifyToken(
      refresh,
      TokenTypeEnum.REFRESH,
    );
    if (!user_id) {
      throw new UnauthorizedException();
    }

    const refreshTokenExist =
      await this.refreshTokenRepository.isRefreshTokenExist(refresh);
    if (!refreshTokenExist) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({
      id: user_id,
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
