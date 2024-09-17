import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// eslint-disable-next-line max-len
import { GetStoredUserDataFromResponse } from '../../../common/custom_decorators/get-stored-user-data-from-response.decorator';
import { JwtAccessGuard } from '../../../common/guards/jwt-access.guard';
import { ManagerRoleGuard } from '../../../common/guards/manager-role.guard';
import { IUserData } from '../../auth/interfaces/IUserData';
import { CarBrandListReqDto } from '../../car-brand-model/dto/req/car-brand-list.req.dto';
import { CarModelListReqDto } from '../../car-brand-model/dto/req/car-model.req.dto';
import { CarBrandResDto } from '../../car-brand-model/dto/res/car-brand.res.dto';
import { CarBrandService } from '../../car-brand-model/services/car-brand.service';
import { CarBrandPresenterService } from '../../car-brand-model/services/car-brand-presenter.service';
import { CarModelService } from '../../car-brand-model/services/car-model.service';
import { CarModelPresenterService } from '../../car-brand-model/services/car-model-presenter.service';
import { GetUsersQueryReqDto } from '../dto/req/getUsersQuery.req.dto';
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
    private readonly carModelPresenter: CarModelPresenterService,
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
  @Patch(':userId/user')
  public async updateUser(
    @GetStoredUserDataFromResponse() userData: IUserData,
    @Body() dto: UserUpdateReqDto,
    @Param('userId') userId: string,
  ): Promise<UserResDto> {
    return this.userPresenter.toResponseDto(
      await this.usersService.updateUser(userData, dto, userId),
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
    return (await this.carBrandService.addBrands(dto)).map((entity) =>
      this.carBrandPresenter.toResponseDto(entity),
    );
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
      path: '/manager/car-models',
    },
  })
  @ApiConflictResponse({
    example: {
      statusCode: 409,
      messages: 'Models: S3, S4 are exists in database',
      timestamp: new Date(),
      path: '/manager/car-models',
    },
  })
  @UseGuards(JwtAccessGuard, ManagerRoleGuard)
  @Post('car-models')
  public async uploadCarModels(
    @Body() dto: CarModelListReqDto,
  ): Promise<CarBrandResDto> {
    const brandEntity = await this.carModelService.addModels(dto);

    return this.carBrandPresenter.toResponseDto(brandEntity);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date(),
      path: '/manager/car-models',
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(JwtAccessGuard, ManagerRoleGuard)
  @Delete('car-models')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteCarModels(@Body() dto: CarModelListReqDto): Promise<void> {
    await this.carModelService.deleteModels(dto);
  }
}
