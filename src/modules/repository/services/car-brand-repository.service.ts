import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarBrandEntity } from '../../../database/entities/car-brand.entity';
import { CarBrandModelReqDto } from '../../car-brand-model/dto/req/car-brand-model.req.dto';
import { GetBrandsModelsQueryReqDto } from '../../car-brand-model/dto/req/get-brand-model-query.req.dto';

@Injectable()
export class CarBrandRepository extends Repository<CarBrandEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarBrandEntity, dataSource.manager);
  }

  public async getBradsModels({
    models,
    search_brand,
    page,
    limit,
  }: GetBrandsModelsQueryReqDto): Promise<[CarBrandEntity[], number]> {
    try {
      const queryResult = this.createQueryBuilder('car_brands')
        .take(limit)
        .skip((page - 1) * limit)
        .orderBy({ 'car_brands.name': 'ASC' });
      if (search_brand) {
        queryResult.andWhere('car_brands.name  ILIKE  :brand', {
          brand: `%${search_brand}%`,
        });
      }
      if (models) {
        queryResult.leftJoinAndSelect('car_brands.models', 'car_models');
      }
      return await queryResult.getManyAndCount();
    } catch (err) {
      throw new Error(err);
    }
  }

  public async brandExist(
    brandList: CarBrandModelReqDto[],
  ): Promise<CarBrandEntity[]> {
    try {
      return await this.createQueryBuilder('car_brands')
        .leftJoinAndSelect('car_brands.models', 'car_models')
        .andWhere(`car_brands.name ILIKE ANY (ARRAY[:...brands])`, {
          brands: brandList.map(({ brand }) => `%${brand}%`),
        })
        .andWhere(`car_models.name ILIKE ANY (ARRAY[:...models])`, {
          models: brandList
            .map(({ models }) => models.map((model) => `%${model}%`))
            .flat(),
        })
        .orderBy({ 'car_brands.name': 'ASC' })
        .getMany();
    } catch (err) {
      throw new Error(err);
    }
  }
}
