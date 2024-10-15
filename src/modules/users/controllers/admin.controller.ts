import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { carBrandModelList } from '../../../common/constants/car-brand-model-list';
import { uaLocationsList } from '../../../common/constants/ua-locations-list';
import { AdminRoleGuard } from '../../../common/guards/admin-role.guard';
import { JwtAccessGuard } from '../../../common/guards/jwt-access.guard';
import { ManagerRoleGuard } from '../../../common/guards/manager-role.guard';
import { CarBrandResDto } from '../../car-brand-model/dto/res/car-brand.res.dto';
import { CarBrandService } from '../../car-brand-model/services/car-brand.service';
import { LocationReqDto } from '../../location/dto/req/location.req.dto';
import { LocationResDto } from '../../location/dto/res/location.res.dto';
import { LocationService } from '../../location/services/location.service';
import { UserCreateByAdminReqDto } from '../dto/req/user-create-by-admin.req.dto';
import { UserUpdateByAdminReqDto } from '../dto/req/user-update-by-admin.req.dto';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserPresenterService } from '../services/user-presenter.service';
import { UsersService } from '../services/users.service';

@ApiTags('2.Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userPresenter: UserPresenterService,
    private readonly carBrandService: CarBrandService,
    private readonly locationService: LocationService,
  ) {}

  @ApiBearerAuth()
  @Post('user')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  public async createUser(
    @Body() dto: UserCreateByAdminReqDto,
  ): Promise<UserResDto> {
    return this.userPresenter.toResponseDto(
      await this.usersService.createUser(dto),
    );
  }

  @ApiBearerAuth()
  @Patch(':user_id/user')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  public async updateUser(
    @Param('user_id', ParseUUIDPipe) user_id: string,
    @Body() dto: UserUpdateByAdminReqDto,
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
      path: '/manager/populate-car-brands',
    },
  })
  @UseGuards(JwtAccessGuard, ManagerRoleGuard)
  @Post('populate-car-brands')
  public async populateCarBrands(): Promise<CarBrandResDto[]> {
    return await this.carBrandService.addBrands({
      brandList: carBrandModelList,
    });
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date(),
      path: '/manager/populate-locations',
    },
  })
  @UseGuards(JwtAccessGuard, ManagerRoleGuard)
  @Post('populate-locations')
  public async populateLocations(): Promise<LocationResDto[]> {
    return await this.locationService.addLocations({
      locations: uaLocationsList as LocationReqDto[],
    });
  }
}
