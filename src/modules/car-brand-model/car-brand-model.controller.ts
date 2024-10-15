import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtAccessGuard } from '../../common/guards/jwt-access.guard';
import { CarBrandRepository } from '../repository/services/car-brand-repository.service';
import { GetBrandsModelsQueryReqDto } from './dto/req/get-brand-model-query.req.dto';
import { CarBrandListResDto } from './dto/res/car_brand-list.res.dto';
import { CarBrandService } from './services/car-brand.service';

@ApiTags('5.Car brands list')
@Controller('brands-and-models-list')
export class CarBrandModelController {
  constructor(
    private readonly carBrandService: CarBrandService,
    private readonly carBrandRepository: CarBrandRepository,
  ) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date(),
      path: '/brands-and-models-list',
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(JwtAccessGuard)
  @Get()
  public async getCarBrandsModels(
    @Query() query: GetBrandsModelsQueryReqDto,
  ): Promise<CarBrandListResDto> {
    return await this.carBrandService.getBrandsModels(query);
  }
}
