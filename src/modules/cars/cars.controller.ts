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
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiPayloadTooLargeResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ApiFile } from '../../common/custom_decorators/api-file.decorator';
import { FileLimitation } from '../../common/custom_decorators/file-limitation.decorator';
// eslint-disable-next-line max-len
import { GetStoredBrandDataFromResponse } from '../../common/custom_decorators/get-stored-brand-data-from-response.decorator';
// eslint-disable-next-line max-len
import { GetStoredCarDataFromResponse } from '../../common/custom_decorators/get-stored-car-data-from-response.decorator';
// eslint-disable-next-line max-len
import { GetStoredLocationDataFromResponse } from '../../common/custom_decorators/get-stored-location-data-from-response.decorator';
// eslint-disable-next-line max-len
import { GetStoredUserDataFromResponse } from '../../common/custom_decorators/get-stored-user-data-from-response.decorator';
import { BanGuard } from '../../common/guards/ban.guard';
import { BrandValidateGuard } from '../../common/guards/brand-validate.guard';
import { CarUpdateBrandValidateGuard } from '../../common/guards/car-update-brand-validate.guard';
import { JwtAccessGuard } from '../../common/guards/jwt-access.guard';
import { LocationValidateGuard } from '../../common/guards/location-validate.guard';
import { OwnershipGuard } from '../../common/guards/ownership.guard';
import { BadWordsPipe } from '../../common/pipes/bad-words.pipe';
import { IBrandData } from '../auth/interfaces/IBrandData';
import { IUserData } from '../auth/interfaces/IUserData';
import { ILocationData } from '../location/interfaces/ILocationData.interface';
import { CarReqDto } from './dto/req/car.req.dto';
import { CarImageQueryReqDto } from './dto/req/car-image-type-query.req.dto';
import { CarQueryReqDto } from './dto/req/car-query.req.dto';
import { CarUpdateReqDto } from './dto/req/car-update.req.dto';
import { CarResDto } from './dto/res/car.res.dto';
import { CarCreateResDto } from './dto/res/car-create.res.dto';
import { CarListResDto } from './dto/res/car-list.res.dto';
import { ICarData } from './interfaces/ICarData.interface';
import { CarPresenterService } from './services/car-presenter.service';
import { CarsService } from './services/cars.service';

@ApiTags('7.Car')
@Controller('car')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly carPresenter: CarPresenterService,
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
  public async search(@Query() query: CarQueryReqDto): Promise<CarListResDto> {
    return this.carPresenter.toResponseListDto(
      await this.carsService.search(query),
      query,
    );
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date(),
      path: '/car/:car_id',
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(
    JwtAccessGuard,
    BanGuard,
    BrandValidateGuard,
    LocationValidateGuard,
  )
  @Post()
  public async create(
    @GetStoredUserDataFromResponse() userData: IUserData,
    @GetStoredBrandDataFromResponse() brandData: IBrandData,
    @GetStoredLocationDataFromResponse() locationData: ILocationData,
    @Body(BadWordsPipe)
    dto: CarReqDto,
  ): Promise<CarCreateResDto> {
    return this.carPresenter.entityToResponseDto(
      await this.carsService.create(userData, brandData, locationData, dto),
    );
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date(),
      path: '/car/:car_id',
    },
  })
  @ApiNotFoundResponse({
    example: {
      statusCode: 404,
      messages: 'Car does not exist',
      timestamp: '2024-09-29T16:44:02.125Z',
      path: '/car/:car_id',
    },
  })
  @ApiConflictResponse({
    example: {
      statusCode: 409,
      messages:
        'invalid input syntax for type uuid: "248784cb-0c61-4fba-92b3-cdf0077c266r"',
      timestamp: '2024-09-29T16:47:36.137Z',
      path: '/car/:car_id',
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(JwtAccessGuard, OwnershipGuard, CarUpdateBrandValidateGuard)
  @Patch(':car_id')
  public async update(
    @GetStoredCarDataFromResponse() carData: ICarData,
    @GetStoredUserDataFromResponse() userData: IUserData,
    @GetStoredBrandDataFromResponse() brandData: IBrandData,
    @Param('car_id', ParseUUIDPipe) car_id: string,
    @Body(BadWordsPipe) dto: CarUpdateReqDto,
  ): Promise<CarResDto> {
    return this.carPresenter.entityToResponseDto(
      await this.carsService.update(carData, brandData, userData, dto),
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Car deleted successfully' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date(),
      path: '/car/:car_id',
    },
  })
  @ApiNotFoundResponse({
    example: {
      statusCode: 404,
      messages: 'Car does not exist',
      timestamp: '2024-09-29T16:44:02.125Z',
      path: '/car/b795b60b-4d8f-41ac-87b8-b4ac3f7d1619',
    },
  })
  @ApiConflictResponse({
    example: {
      statusCode: 409,
      messages:
        'invalid input syntax for type uuid: "248784cb-0c61-4fba-92b3-cdf0077c266r"',
      timestamp: '2024-09-29T16:47:36.137Z',
      path: '/car/248784cb-0c61-4fba-92b3-cdf0077c266r',
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(JwtAccessGuard, OwnershipGuard)
  @Delete(':car_id')
  public async delete(
    @Param('car_id', ParseUUIDPipe) car_id: string,
    @GetStoredCarDataFromResponse() car_data: ICarData,
  ): Promise<void> {
    return await this.carsService.delete(car_data);
  }

  @UseGuards(JwtAccessGuard, OwnershipGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiPayloadTooLargeResponse({
    description: 'Filesize is more than 0.5MB',
    example: {
      statusCode: 413,
      messages: 'File too large',
      timestamp: '2024-10-09T14:25:21.476Z',
      path: '/car/2d56d0df-cf5f-4d13-bab0-28b1ec775527/image?image_type=primary_car_image',
    },
  })
  @ApiNoContentResponse({ description: 'Car image saved successfully' })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @FileLimitation('image', 1024 * 500)
  @ApiFile('image', false, true, '0.5MB')
  @Post(':car_id/image')
  public async uploadImage(
    // take file from request
    // Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

    @UploadedFile() image: Express.Multer.File,
    @Query() query: CarImageQueryReqDto,
    @Param('car_id', ParseUUIDPipe) car_id: string,
    @GetStoredUserDataFromResponse()
    user_data: IUserData,
    @GetStoredCarDataFromResponse()
    car_data: ICarData,
  ): Promise<void> {
    await this.carsService.uploadImage(user_data, car_data, image, query);
  }

  @UseGuards(JwtAccessGuard, OwnershipGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Car image removed successfully' })
  @ApiBearerAuth()
  @Delete(':car_id/image/:image_id')
  public async deleteImage(
    // take file from request
    // Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
    @Param('car_id', ParseUUIDPipe) car_id: string,
    @Param('image_id', ParseUUIDPipe) image_id: string,
    @GetStoredUserDataFromResponse()
    user_data: IUserData,
    @GetStoredCarDataFromResponse()
    car_data: ICarData,
  ): Promise<void> {
    await this.carsService.deleteImage(user_data, car_data, car_id, image_id);
  }
}
