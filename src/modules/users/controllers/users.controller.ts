import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiPayloadTooLargeResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ApiFile } from '../../../common/custom_decorators/api-file.decorator';
import { FileLimitation } from '../../../common/custom_decorators/file-limitation.decorator';
// eslint-disable-next-line max-len
import { GetStoredUserDataFromResponse } from '../../../common/custom_decorators/get-stored-user-data-from-response.decorator';
import { JwtAccessGuard } from '../../../common/guards/jwt-access.guard';
import { IUserData } from '../../auth/interfaces/IUserData';
import { UserSelfUpdateReqDto } from '../dto/req/user-self-update.req.dto';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserPresenterService } from '../services/user-presenter.service';
import { UsersService } from '../services/users.service';

@ApiTags('4.User')
@Controller('user')
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
      path: '/user/me',
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

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Patch('me')
  public async updateMe(
    @GetStoredUserDataFromResponse() UserData: IUserData,
    @Body() dto: UserSelfUpdateReqDto,
  ): Promise<UserResDto> {
    return await this.usersService.updateMe(UserData, dto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorised' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNoContentResponse({ description: 'User successfully removed' })
  @UseGuards(JwtAccessGuard)
  @Delete('me')
  public async removeMe(
    @GetStoredUserDataFromResponse() userData: IUserData,
  ): Promise<void> {
    await this.usersService.removeMe(userData);
  }

  @UseGuards(JwtAccessGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Avatar saved successfully' })
  @ApiPayloadTooLargeResponse({
    description: 'Filesize is more than 0.3MB',
    example: {
      statusCode: 413,
      messages: 'File too large',
      timestamp: '2024-10-09T17:21:35.763Z',
      path: '/user/me/avatar',
    },
  })
  @ApiBearerAuth()
  @FileLimitation('avatar', 1024 * 300)
  @ApiConsumes('multipart/form-data')
  @ApiFile('avatar', false, false, '0.3MB')
  @Post('me/avatar')
  public async uploadAvatar(
    // take file from request
    // Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

    @UploadedFile() avatar: Express.Multer.File,
    @GetStoredUserDataFromResponse()
    userData: IUserData,
  ): Promise<void> {
    await this.usersService.uploadAvatar(userData, avatar);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Avatar deleted successful' })
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Delete('me/avatar')
  public async deleteAvatar(
    @GetStoredUserDataFromResponse() userData: IUserData,
  ): Promise<void> {
    await this.usersService.deleteAvatar(userData);
  }
}
