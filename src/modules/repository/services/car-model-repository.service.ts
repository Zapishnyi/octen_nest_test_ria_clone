import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarModelEntity } from '../../../database/entities/car-model.entity';

@Injectable()
export class CarModelRepository extends Repository<CarModelEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarModelEntity, dataSource.manager);
  }

  // public async getModels(): Promise<string[]> {
  //   return (await this.find()).map((entity) => entity.brand);
  // }

  public async modelExist(
    models: string[],
    brand_id: string,
  ): Promise<CarModelEntity[]> {
    try {
      return await this.createQueryBuilder('car_model')
        .andWhere('car_model.brand_id = :brand_id', { brand_id })
        .andWhere(`car_model.name ILIKE ANY (ARRAY[:...models])`, {
          models: models.map((model) => `%${model}%`),
        })
        .orderBy({ 'car_model.name': 'ASC' })
        .getMany();
    } catch (err) {
      throw new Error(err);
    }
  }
}
