import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// eslint-disable-next-line max-len
import { GetStoredUserDataFromResponse } from '../../../common/custom_decorators/get-stored-user-data-from-response.decorator';
import { JwtAccessGuard } from '../../../common/guards/jwt-access.guard';
import { IUserData } from '../../auth/interfaces/IUserData';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserPresenterService } from '../services/user-presenter.service';
import { UsersService } from '../services/users.service';

@ApiTags('4.User')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userPresenter: UserPresenterService,
  ) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date().toUTCString(),
      path: '/users/me',
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(JwtAccessGuard)
  @Get('me')
  public async findMe(
    @GetStoredUserDataFromResponse() UserData: IUserData,
  ): Promise<UserResDto> {
    return await this.usersService.findMe(UserData);
  }
}
