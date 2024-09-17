import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarBrandEntity } from '../../../database/entities/car-brand.entity';
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
        .orderBy({ 'car_brands.created': 'ASC' });
      if (search_brand) {
        queryResult.andWhere('car_brands.brand  ILIKE  :brand', {
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

  public async brandExist(brandList: string[]): Promise<CarBrandEntity[]> {
    try {
      return await this.createQueryBuilder('car_brands')
        .andWhere(`car_brands.brand ILIKE ANY (ARRAY[:...brands])`, {
          brands: brandList.map((brand) => `%${brand}%`),
        })
        .orderBy({ 'car_brands.brand': 'ASC' })
        .getMany();
    } catch (err) {
      throw new Error(err);
    }
  }
}
