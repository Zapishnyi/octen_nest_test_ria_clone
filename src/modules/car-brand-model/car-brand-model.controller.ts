import { Controller, Get, Query } from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

import { CarBrandRepository } from '../repository/services/car-brand-repository.service';
import { GetBrandsModelsQueryReqDto } from './dto/req/get-brand-model-query.req.dto';
import { CarBrandListResDto } from './dto/res/car-brand-list.res.dto';
import { CarBrandService } from './services/car-brand.service';

@ApiTags('5.Car brands and models')
@Controller('brands-and-models')
export class CarBrandModelController {
  constructor(
    private readonly carBrandService: CarBrandService,
    private readonly carBrandRepository: CarBrandRepository,
  ) {}

  // @ApiBearerAuth()
  // @ApiUnauthorizedResponse({
  //   description: 'Unauthorized',
  //   example: {
  //     statusCode: 401,
  //     messages: 'Unauthorized',
  //     timestamp: new Date(),
  //     path: '/brands-and-models-list',
  //   },
  // })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  // @UseGuards(JwtAccessGuard)
  @Get()
  public async getCarBrandsModels(
    @Query() query: GetBrandsModelsQueryReqDto,
  ): Promise<CarBrandListResDto> {
    return await this.carBrandService.getBrandsModels(query);
  }
}
