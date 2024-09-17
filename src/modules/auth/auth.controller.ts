import {
  Body,
  Controller,
  forwardRef,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// eslint-disable-next-line max-len
import { GetStoredUserDataFromResponse } from '../../common/custom_decorators/get-stored-user-data-from-response.decorator';
import { JwtAccessGuard } from '../../common/guards/jwt-access.guard';
import { JwtRefreshGuard } from '../../common/guards/jwt-refresh.guard';
import { UserPresenterService } from '../users/services/user-presenter.service';
import { UserSingInReqDto } from './dto/req/user-sing-in.req.dto';
import { UserSingUpReqDto } from './dto/req/user-sing-up.req.dto';
import { AuthResDto } from './dto/res/auth.res.dto';
import { TokenPairResDto } from './dto/res/token-pair.res.dto';
import { IUserData } from './interfaces/IUserData';
import { AuthService } from './services/auth.service';

@ApiTags('1.Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UserPresenterService))
    private readonly userPresenter: UserPresenterService,
  ) {}

  @Post('sing-up')
  // ToDo
  public async singUp(
    @Body() dto: UserSingUpReqDto,
    @Req() request: Request,
  ): Promise<any> {
    return await this.authService.singUp(dto, request);
  }

  @Post('sing-in')
  public async singIn(
    @Body() dto: UserSingInReqDto,
    @Req() request: Request,
  ): Promise<AuthResDto> {
    const [user, tokens] = await this.authService.singIn(dto, request);
    return { tokens, user: this.userPresenter.toResponseDto(user) };
  }

  // Skip access token check

  // add refresh token check
  @UseGuards(JwtRefreshGuard)
  // Add authorization marker to endpoint in Swagger
  @ApiBearerAuth()
  @Post('refresh')
  public async refresh(
    @GetStoredUserDataFromResponse() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.refresh(userData);
  }

  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth()
  @Post('sign-out')
  async signOut(
    @GetStoredUserDataFromResponse() userData: IUserData,
  ): Promise<void> {
    await this.authService.signOut(userData);
  }
}
