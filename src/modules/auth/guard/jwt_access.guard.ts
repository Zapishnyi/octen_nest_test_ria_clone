import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { TokenTypeEnum } from '../../../common/enums/token-type.enum';
import { UserRepository } from '../../repository/services/user_repository.service';
import { AuthAccessService } from '../services/auth-access.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    // When you create a custom decorator using @SetMetadata, you often retrieve this metadata
    // later in a guard or interceptor.
    // The Reflector provides a consistent API to do this.
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthAccessService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(
    context: ExecutionContext /* give access to current request data*/,
    // This context can be of different types, such as HTTP, WebSocket, RPC, etc.
  ): Promise<boolean> {
    // to prevent guard working on certain endpoints, looking for metadata 'SKIP_AUTH'
    // if  endpoint has it, return true
    const skipAuth = this.reflector.getAllAndOverride<boolean>('SKIP_AUTH', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;

    const request = context.switchToHttp().getRequest();
    const access = request.get('Authorization')?.split(' ').pop();

    if (!access) {
      throw new UnauthorizedException();
    }

    const { userId, deviceId } = await this.tokenService.verifyToken(
      access,
      TokenTypeEnum.ACCESS,
    );
    if (!userId) {
      throw new UnauthorizedException();
    }

    const accessTokenExist = await this.authCacheService.isAccessTokenExist(
      userId,
      deviceId,
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
    // creation of data storage inside "request" with data received in guard for future use
    request.user = {
      userId,
      deviceId,
      email: user.email,
    };

    return true;
  }
}
