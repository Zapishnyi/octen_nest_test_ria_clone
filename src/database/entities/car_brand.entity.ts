import { Column, Entity, OneToMany } from 'typeorm';

import { BaseModel } from './base_model/base.model';
import { CarEntity } from './car.entity';

@Entity('car_brands')
export class CarBrandEntity extends BaseModel {
  @Column('text')
  brand: string;

  @OneToMany(() => CarEntity, (entity) => entity.brand)
  cars?: CarEntity[];
}
