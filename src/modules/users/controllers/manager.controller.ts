import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// eslint-disable-next-line max-len
import { GetStoredUserDataFromResponse } from '../../../common/custom_decorators/get-stored-user-data-from-response.decorator';
import { JwtAccessGuard } from '../../../common/guards/jwt-access.guard';
import { ManagerRoleGuard } from '../../../common/guards/manager-role.guard';
import { IUserData } from '../../auth/interfaces/IUserData';
import { CarBrandListReqDto } from '../../car-brand-model/dto/req/car-brand-list.req.dto';
import { CarBrandResDto } from '../../car-brand-model/dto/res/car-brand.res.dto';
import { CarBrandService } from '../../car-brand-model/services/car-brand.service';
import { CarBrandPresenterService } from '../../car-brand-model/services/car-brand-presenter.service';
import { CarModelService } from '../../car-brand-model/services/to_delete/car-model.service';
import { LocationDeleteQueryReqDto } from '../../location/dto/req/location-delete-query.req.dto';
import { LocationListReqDto } from '../../location/dto/req/location-list.req.dto';
import { LocationResDto } from '../../location/dto/res/location.res.dto';
import { LocationService } from '../../location/services/location.service';
import { GetUsersQueryReqDto } from '../dto/req/get-users-query.req.dto';
import { UserUpdateReqDto } from '../dto/req/user-update.req.dto';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserListResDto } from '../dto/res/user-list.res.dto';
import { UserPresenterService } from '../services/user-presenter.service';
import { UsersService } from '../services/users.service';

@ApiTags('3.Manager')
@Controller('manager')
export class ManagerController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userPresenter: UserPresenterService,
    private readonly carBrandService: CarBrandService,
    private readonly carBrandPresenter: CarBrandPresenterService,
    private readonly carModelService: CarModelService,
    private readonly locationService: LocationService,
  ) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date().toUTCString(),
      path: '/users',
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(JwtAccessGuard, ManagerRoleGuard)
  @Get('users')
  public async getUsers(
    @GetStoredUserDataFromResponse() userData: IUserData,
    @Query() query: GetUsersQueryReqDto,
  ): Promise<UserListResDto> {
    const [usersList, total] = await this.usersService.getUsers(
      userData,
      query,
    );
    return this.userPresenter.toUserListDto(usersList, query, total);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date().toUTCString(),
      path: '/:userId/user',
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(JwtAccessGuard, ManagerRoleGuard)
  @Patch(':user_id/user')
  public async updateUser(
    @Body() dto: UserUpdateReqDto,
    @Param('user_id', ParseUUIDPipe) user_id: string,
  ): Promise<UserResDto> {
    return this.userPresenter.toResponseDto(
      await this.usersService.updateUser(dto, user_id),
    );
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date(),
      path: '/manager/car-brands',
    },
  })
  @ApiConflictResponse({
    example: {
      statusCode: 409,
      messages: 'Brands: BMW, Audi are exists in database',
      timestamp: new Date(),
      path: '/manager/car-brands',
    },
  })
  @UseGuards(JwtAccessGuard, ManagerRoleGuard)
  @Post('car-brands')
  public async uploadCarBrands(
    @Body() dto: CarBrandListReqDto,
  ): Promise<CarBrandResDto[]> {
    return await this.carBrandService.addBrands(dto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date(),
      path: '/manager/car-brands',
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNoContentResponse({ description: 'Brands/models successfully removed' })
  @UseGuards(JwtAccessGuard, ManagerRoleGuard)
  @Delete('car-brands')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteCarBrands(@Body() dto: CarBrandListReqDto): Promise<void> {
    await this.carBrandService.deleteBrands(dto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date(),
      path: '/manager/location',
    },
  })
  @UseGuards(JwtAccessGuard, ManagerRoleGuard)
  @Post('location')
  public async uploadLocations(
    @Body() dto: LocationListReqDto,
  ): Promise<LocationResDto[]> {
    return await this.locationService.addLocations(dto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date(),
      path: '/manager/location',
    },
  })
  @ApiConflictResponse({
    example: {
      statusCode: 409,
      messages: 'Cities: Unknown1,Unknown2 are not exists in database',
      timestamp: '2024-10-07T11:13:27.691Z',
      path: '/manager/location?locations=Unknown1&locations=Unknown2',
    },
  })
  @UseGuards(JwtAccessGuard, ManagerRoleGuard)
  @ApiNoContentResponse({ description: 'Location successfully removed' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('location')
  public async deleteLocations(
    @Query() query: LocationDeleteQueryReqDto,
  ): Promise<void> {
    return await this.locationService.deleteLocations(query);
  }
}
