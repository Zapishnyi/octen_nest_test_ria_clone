import { Column, Entity, OneToMany } from 'typeorm';

import { BaseModel } from './base_model/base.model';
import { CarEntity } from './car.entity';
import { CarModelEntity } from './car-model.entity';

@Entity('car_brands')
export class CarBrandEntity extends BaseModel {
  @Column('text', { unique: true })
  brand: string;

  @OneToMany(() => CarModelEntity, (entity) => entity.brand)
  models?: CarModelEntity[];

  @OneToMany(() => CarEntity, (entity) => entity.brand_link)
  cars?: CarEntity[];
}
