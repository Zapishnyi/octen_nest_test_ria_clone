import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SkipAuth } from '../../../common/custom_decorators/skip_auth.decorator';
import { UserEntity } from '../../../database/entities/user.entity';
import { RefreshTokenRepository } from '../../repository/services/refresh_token_repository.service';
import { UserRepository } from '../../repository/services/user_repository.service';
import { UsersService } from '../../users/services/users.service';
import { UserSingInReqDto } from '../dto/req/user-sing-in.req.dto';
import { UserSingUpReqDto } from '../dto/req/user-sing-up.req.dto';
import { TokenPairResDto } from '../dto/res/token-pair.res.dto';
import { IUserData } from '../interfaces/IUserData';
import { AuthAccessService } from './auth-access.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly refreshRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly authAccessService: AuthAccessService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  private async generateSaveTokens(
    userId: string,
    deviceId: string,
  ): Promise<TokenPairResDto> {
    const tokens = await this.tokenService.generateAuthTokens({
      userId,
      deviceId,
    });
    await Promise.all([
      this.refreshRepository.save({
        deviceId,
        refresh: tokens.refresh,
        userId,
      }),
      this.authAccessService.saveToken(tokens.access, userId, deviceId),
    ]);
    return tokens;
  }

  private async deleteTokens(userId: string, deviceId: string) {
    // delete previously issued refresh and access Tokens
    await Promise.all([
      this.refreshRepository.delete({
        deviceId,
        userId,
      }),
      this.authAccessService.deleteToken(userId, deviceId),
    ]);
  }

  @SkipAuth()
  public async singUp(
    dto: UserSingUpReqDto,
  ): Promise<[UserEntity, TokenPairResDto]> {
    // Check if user exist
    await this.userService.isEmailExistOrThrow(dto.email);

    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    const tokens = await this.generateSaveTokens(user.id, '2' /*ToDo*/);
    return [user, tokens];
  }

  @SkipAuth()
  public async singIn(
    dto: UserSingInReqDto,
  ): Promise<[UserEntity, TokenPairResDto]> {
    // Is user exist?
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        role: true,
        avatar_image: true,
        created: true,
        updated: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    // Is password valid?
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    // delete previously issued refresh and access Tokens
    await this.deleteTokens(user.id, '2' /*ToDo*/);

    const tokens = await this.generateSaveTokens(user.id, '2' /*ToDo*/);

    return [user, tokens];
  }

  public async refresh({
    userId,
    deviceId,
  }: IUserData): Promise<TokenPairResDto> {
    await this.deleteTokens(userId, deviceId);
    return await this.generateSaveTokens(userId, deviceId);
  }

  public async signOut({ userId, deviceId }: IUserData) {
    await this.deleteTokens(userId, deviceId);
  }
}
