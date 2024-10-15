import { Injectable } from '@nestjs/common';

import { CarBrandEntity } from '../../../database/entities/car-brand.entity';
import { GetBrandsModelsQueryReqDto } from '../dto/req/get-brand-model-query.req.dto';
import { CarBrandListResDto } from '../dto/res/car_brand-list.res.dto';
import { CarBrandResDto } from '../dto/res/car-brand.res.dto';
import { CarModelPresenterService } from './car-model-presenter.service';

@Injectable()
export class CarBrandPresenterService {
  constructor(private readonly carModelPresenter: CarModelPresenterService) {}

  public toResponseDto({
    brand,
    created,
    updated,
    id,
    models,
  }: CarBrandEntity): CarBrandResDto {
    return {
      id,
      brand,
      created,
      updated,
      models: models?.map((model) =>
        this.carModelPresenter.toResponseDto(model),
      ),
    };
  }

  public toResponseListDto(
    entities: CarBrandEntity[],
    query: GetBrandsModelsQueryReqDto,
    total: number,
  ): CarBrandListResDto {
    return {
      data: entities.map((entity) => this.toResponseDto(entity)),
      total,
      limit: query.limit,
      page: query.page,
      pages: Math.ceil(total / query.limit),
      search_brand: query.search_brand,
      models: query.models,
    };
  }
}
