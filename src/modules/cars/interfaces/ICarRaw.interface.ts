import { CurrencyEnum } from '../enums/currency.enum';

export interface ICarRaw {
  car_id: string;
  car_created: Date;
  car_updated: Date;
  car_mileage: number;
  car_build: number;
  car_price: number;
  car_currency: CurrencyEnum;
  car_image: string[];
  brand_name: string;
  model_name: string;
  car_price_calculated: number;
  car_currency_final: CurrencyEnum;
  total_count: string;
}
