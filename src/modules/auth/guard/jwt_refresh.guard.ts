import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { TokenTypeEnum } from '../../../common/enums/token-type.enum';
import { RefreshTokenRepository } from '../../repository/services/refresh_token_repository.service';
import { UserRepository } from '../../repository/services/user_repository.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    // When you create a custom decorator using @SetMetadata, you often retrieve this metadata
    // later in a guard or interceptor.
    // The Reflector provides a consistent API to do this.
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(
    context: ExecutionContext /* give access to current request data*/,
    // This context can be of different types, such as HTTP, WebSocket, RPC, etc.
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refresh = request.get('Authorization')?.split(' ').pop();

    if (!refresh) {
      throw new UnauthorizedException();
    }

    const { userId, deviceId } = await this.tokenService.verifyToken(
      refresh,
      TokenTypeEnum.REFRESH,
    );
    if (!userId) {
      throw new UnauthorizedException();
    }

    const refreshTokenExist =
      await this.refreshTokenRepository.isRefreshTokenExist(refresh);
    if (!refreshTokenExist) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    // creation of data storage inside "request" with data received in guard for future use
    request.user = {
      userId,
      deviceId,
      email: user.email,
    };

    return true;
  }
}
