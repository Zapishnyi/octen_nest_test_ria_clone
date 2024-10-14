import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { LocationEntity } from '../../../database/entities/location.entity';

@Injectable()
export class LocationRepositoryService extends Repository<LocationEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(LocationEntity, dataSource.manager);
  }

  public async getLocations(
    city_query_list: string[],
  ): Promise<LocationEntity[]> {
    try {
      const locationsSearchResult = this.createQueryBuilder('location');
      if (city_query_list?.length) {
        locationsSearchResult.andWhere(
          `location.city ILIKE ANY (ARRAY[:...cities])`,
          {
            cities: city_query_list.map((city) => `%${city}%`),
          },
        );
      }
      return await locationsSearchResult
        .orderBy({ 'location.city': 'ASC' })
        .getMany();
    } catch (err) {
      throw new Error(err);
    }
  }
}
