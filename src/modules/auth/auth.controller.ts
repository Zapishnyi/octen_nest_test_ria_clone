import {
  Body,
  Controller,
  forwardRef,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { GetStoredDataFromResponse } from '../../common/custom_decorators/get_stored_data_from_response.decorator';
import { SkipAuth } from '../../common/custom_decorators/skip_auth.decorator';
import { UserPresenterService } from '../users/services/user-presenter.service';
import { UserSingInReqDto } from './dto/req/user-sing-in.req.dto';
import { UserSingUpReqDto } from './dto/req/user-sing-up.req.dto';
import { AuthResDto } from './dto/res/auth.res.dto';
import { TokenPairResDto } from './dto/res/token-pair.res.dto';
import { JwtRefreshGuard } from './guard/jwt_refresh.guard';
import { IUserData } from './interfaces/IUserData';
import { AuthService } from './services/auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UserPresenterService))
    private readonly userPresenter: UserPresenterService,
  ) {}

  @SkipAuth()
  @Post('sing-up')
  // ToDo
  public async singUp(@Body() dto: UserSingUpReqDto): Promise<any> {
    return await this.authService.singUp(dto);
  }

  @SkipAuth()
  @Post('sing-in')
  public async singIn(@Body() dto: UserSingInReqDto): Promise<AuthResDto> {
    const [user, tokens] = await this.authService.singIn(dto);
    return { tokens, user: this.userPresenter.toResponseDto(user) };
  }

  // Skip access token check
  @SkipAuth()
  // add refresh token check
  @UseGuards(JwtRefreshGuard)
  // Add authorization marker to endpoint in Swagger
  @ApiBearerAuth()
  @Post('refresh')
  public async refresh(
    @GetStoredDataFromResponse() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.refresh(userData);
  }

  @ApiBearerAuth()
  @Post('sign-out')
  async signOut(
    @GetStoredDataFromResponse() userData: IUserData,
  ): Promise<void> {
    await this.authService.signOut(userData);
  }
}
