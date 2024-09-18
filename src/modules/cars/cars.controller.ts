import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// eslint-disable-next-line max-len
// eslint-disable-next-line max-len
import { BrandValidateGuard } from '../../common/guards/brand-validate.guard';
import { JwtAccessGuard } from '../../common/guards/jwt-access.guard';
import { CarBrandService } from '../car-brand-model/services/car-brand.service';
import { UserPresenterService } from '../users/services/user-presenter.service';
import { UsersService } from '../users/services/users.service';
import { CarsService } from './services/cars.service';

@ApiTags('6.Car')
@Controller('car')
export class CarsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userPresenter: UserPresenterService,
    private readonly carBrandService: CarBrandService,
    private readonly carsService: CarsService,
  ) {}

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date(),
      path: '/car',
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get()
  public async search() // @GetStoredUserDataFromResponse() UserData: IUserData,
  // @Body() dto: any,
  : Promise<any> {
    return;
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date(),
      path: '/car',
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(JwtAccessGuard, BrandValidateGuard)
  @Post()
  public async create() // @GetStoredUserDataFromResponse() userData: IUserData,
  // @GetStoredBrandDataFromResponse() brandId: string,
  // @Body() dto: CarReqDto,
  : Promise<any> {
    return await this.carsService.create();
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date(),
      path: '/car',
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(JwtAccessGuard)
  @Delete()
  public async delete() // @GetStoredUserDataFromResponse() UserData: IUserData,
  // @Body() dto: any,
  : Promise<any> {
    return;
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date(),
      path: '/car',
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(JwtAccessGuard)
  @Patch()
  public async update() // @GetStoredUserDataFromResponse() UserData: IUserData,
  // @Body() dto: any,
  : Promise<any> {
    return;
  }
}
