import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AwsConfig, EnvConfigType } from '../../../configs/envConfigType';
import { CarEntity } from '../../../database/entities/car.entity';
import { CarQueryReqDto } from '../dto/req/car-query.req.dto';
import { CarResDto } from '../dto/res/car.res.dto';
import { CarCreateResDto } from '../dto/res/car-create.res.dto';
import { CarListResDto } from '../dto/res/car-list.res.dto';
import { ICarRaw } from '../interfaces/ICarRaw.interface';

@Injectable()
export class CarPresenterService {
  constructor(private readonly configService: ConfigService<EnvConfigType>) {}

  public RawToResponseDto(raw: ICarRaw): CarResDto {
    const awsConfig = this.configService.get<AwsConfig>('aws');
    return {
      id: raw.car_id,
      brand: raw.brand_name,
      model: raw.model_name,
      mileage: raw.car_mileage,
      build: raw.car_build,
      description: raw.car_description,
      image: raw.car_image.length
        ? raw.car_image.map((path) => `${awsConfig.bucketURL}/${path}`)
        : [],
      price_initial: raw.car_price,
      currency_initial: raw.car_currency,
      price_calculated: Number(raw.car_price_calculated.toFixed(2)),
      currency_requested: raw.car_currency_final,
    };
  }

  public entityToResponseDto(entity: CarEntity): CarCreateResDto {
    return {
      id: entity.id,
      brand: entity.brand.name,
      model: entity.model.name,
      mileage: entity.mileage,
      build: entity.build,
      description: entity.description,
      image: entity.image,
      price_initial: entity.price,
      currency_initial: entity.currency,
    };
  }

  public toResponseListDto(
    [carRaw, total]: [ICarRaw[], number],
    {
      limit,
      page,
      order,
      orderBy,
      model,
      brand,
      city,
      area,
      currency,
      price_min,
      price_max,
      build_min,
      build_max,
      mileage_min,
      mileage_max,
    }: CarQueryReqDto,
  ): CarListResDto {
    return {
      data: carRaw.map((carRaw) => this.RawToResponseDto(carRaw)),
      total,
      limit,
      page,
      pages: Math.ceil(total / limit),
      order,
      orderBy,
      currency,
      brand,
      model,
      city,
      area,
      price_min,
      price_max,
      build_min,
      build_max,
      mileage_min,
      mileage_max,
    };
  }
}
