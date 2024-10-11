import { CarBrandEntity } from '../../../database/entities/car-brand.entity';
import { CarModelEntity } from '../../../database/entities/car-model.entity';

export interface IBrandData {
  brand: CarBrandEntity;
  model: CarModelEntity;
}
