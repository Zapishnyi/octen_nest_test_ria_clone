import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { RateEntity } from '../../../database/entities/rate.entity';
import { MarkerEnum } from '../enums/marker.enum';
import { IPBExchangeRate } from '../interface/IPB-ExchangeRate.inteface';

@Injectable()
export class RateRepository extends Repository<RateEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RateEntity, dataSource.manager);
  }

  public async updateCurrency() {
    try {
      const currency: IPBExchangeRate[] = await fetch(
        'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11',
      ).then((response) => response.json());
      await this.save({
        marker: MarkerEnum.MARKER,
        buy_eur: currency[0].buy,
        sale_eur: currency[0].sale,
        buy_usd: currency[1].buy,
        sale_usd: currency[1].sale,
      });
      Logger.log(
        `Currency exchange rate updated successfully on ${new Date().toISOString()}.`,
      );
    } catch (error) {
      Logger.error(
        `Currency exchange rate update failed on ${new Date().toISOString()}: ${error}`,
      );
    }
  }
}
