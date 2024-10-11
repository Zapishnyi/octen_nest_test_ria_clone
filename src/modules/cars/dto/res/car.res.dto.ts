import { ApiProperty } from '@nestjs/swagger';

import { CurrencyEnum } from '../../enums/currency.enum';

export class CarResDto {
  @ApiProperty({ format: 'uuid' })
  public readonly id: string;
  public readonly brand: string;
  public readonly model: string;
  public readonly mileage: number;
  public readonly build: number;
  public readonly image: string[];
  public readonly price_initial: number;
  public readonly currency_initial: CurrencyEnum;
  public readonly price_calculated?: number;
  public readonly currency_requested?: CurrencyEnum;
}
