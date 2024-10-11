import { CurrencyEnum } from '../../enums/currency.enum';
import { OrderEnum } from '../../enums/order.enum';
import { CarResDto } from './car.res.dto';

export class CarListResDto {
  data: CarResDto[];
  total: number;
  limit: number;
  page: number;
  pages: number;
  order: OrderEnum;
  orderBy: string;
  currency: CurrencyEnum;
  brand: string;
  model: string;
  city: string;
  area: string;
  price_min: number;
  price_max: number;
  build_min: number;
  build_max: number;
  mileage_min: number;
  mileage_max: number;
}
