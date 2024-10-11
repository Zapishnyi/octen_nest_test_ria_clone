import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarEntity } from '../../../database/entities/car.entity';
import { CarQueryReqDto } from '../../cars/dto/req/car-query.req.dto';
import { CurrencyEnum } from '../../cars/enums/currency.enum';
import { ICarRaw } from '../../cars/interfaces/ICarRaw.interface';
import { ShowListRepository } from './show-list-repository.service';

@Injectable()
export class CarRepository extends Repository<CarEntity> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly showListRepository: ShowListRepository,
  ) {
    super(CarEntity, dataSource.manager);
  }

  public async search({
    limit,
    page,
    order,
    orderBy,
    brand,
    price_max,
    price_min,
    build_min,
    build_max,
    mileage_max,
    mileage_min,
    currency,
    model,
  }: CarQueryReqDto): Promise<[ICarRaw[], number]> {
    try {
      // .distinct(true)
      //   .leftJoinAndSelect('car.rate', 'rate')
      //   .leftJoinAndSelect('car.brand', 'brand')
      //   .leftJoinAndSelect('car.model', 'model');
      // console.log(await testQuery.getMany());
      const subQuery = this.createQueryBuilder('car')
        // .distinct(true)
        .leftJoinAndSelect('car.rate', 'rate')
        .leftJoinAndSelect('car.brand', 'brand')
        .leftJoinAndSelect('car.model', 'model');

      switch (currency) {
        case CurrencyEnum.UAH:
          subQuery
            .addSelect(
              `CASE
          WHEN car.currency = 'UAH' 
          THEN car.price
          
          WHEN car.currency = 'USD' 
          THEN car.price * rate.sale_usd
          
          WHEN car.currency = 'EUR' 
          THEN car.price * rate.sale_eur
          END`,
              `car_price_calculated`,
            )
            .addSelect(`'UAH'`, 'car_currency_final');
          break;
        case CurrencyEnum.USD:
          subQuery
            .addSelect(
              `CASE
          WHEN car.currency = 'UAH' 
          THEN car.price * rate.buy_usd
          
          WHEN car.currency = 'USD' 
          THEN car.price
          
          WHEN car.currency = 'EUR' 
          THEN car.price * rate.sale_eur / rate.buy_usd
          END`,
              `car_price_calculated`,
            )
            .addSelect(`'USD'`, 'car_currency_final');
          break;
        case CurrencyEnum.EUR:
          subQuery
            .addSelect(
              `CASE
          WHEN car.currency = 'UAH' 
          THEN car.price * rate.buy_eur
          
          WHEN car.currency = 'USD' 
          THEN car.price * rate.sale_usd / rate.buy_eur
          
          WHEN car.currency = 'EUR' 
          THEN car.price
          END`,
              `car_price_calculated`,
            )
            .addSelect(`'EUR'`, 'car_currency_final');
          break;
      }
      const queryResult = this.createQueryBuilder()
        .select([
          'car_id',
          'brand_name',
          'model_name',
          'car_build',
          'car_mileage',
          'car_created',
          'car_updated',
          'car_price',
          'car_currency',
          'car_image',
          'car_price_calculated',
          'car_currency_final',
          'COUNT(*) OVER() as total_count', // Adding window function for total count
        ])
        .from(`(${subQuery.getQuery()})`, 'car_copy')
        .setParameters(subQuery.getParameters())
        .groupBy(
          'car_copy.car_id,' +
            'car_copy.brand_name,' +
            'car_copy.model_name,' +
            'car_copy.car_build,' +
            'car_copy.car_mileage,' +
            'car_copy.car_created,' +
            'car_copy.car_updated,' +
            'car_copy.car_price,' +
            'car_copy.car_currency,' +
            'car_copy.car_image,' +
            'car_copy.car_price_calculated,' +
            'car_copy.car_currency_final',
        );

      if (brand) {
        queryResult.andWhere('car_copy.brand_name ILIKE  :brand', {
          brand: `%${brand}%`,
        });
      }
      if (model) {
        queryResult.andWhere('car_copy.model_name  ILIKE  :model', {
          model: `%${model}%`,
        });
      }

      if (price_max) {
        queryResult.andWhere('car_copy.car_price_calculated <  :price_max', {
          price_max,
        });
      }
      if (price_min) {
        queryResult.andWhere('car_copy.car_price_calculated > :price_min ', {
          price_min,
        });
      }

      if (build_max) {
        queryResult.andWhere('car_copy.car_build < :build_max', {
          build_max,
        });
      }
      if (build_min) {
        queryResult.andWhere('car_copy.car_build > :build_min ', {
          build_min,
        });
      }
      if (mileage_max) {
        queryResult.andWhere('car_copy.car_mileage < :mileage_max', {
          mileage_max,
        });
      }
      if (mileage_min) {
        queryResult.andWhere('car_copy.car_mileage > :mileage_min', {
          mileage_min,
        });
      }

      const carsToGetTotal: ICarRaw[] = await queryResult
        .limit(1)
        .offset(0)
        .getRawMany();
      const total = Number(carsToGetTotal[0]?.total_count || 0);

      queryResult
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(`car_copy.${orderBy}`, order);
      const cars = await queryResult.getRawMany();
      // console.log('total', total);
      await this.showListRepository.save(
        cars.map((item) =>
          this.showListRepository.create({ car_id: item.car_id }),
        ),
      );
      return [cars, total];
    } catch (err) {
      throw new Error(err);
    }
  }
}
