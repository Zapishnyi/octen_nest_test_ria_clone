import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseModel } from './base_model/base.model';
import { CarEntity } from './car.entity';
import { CarBrandEntity } from './car-brand.entity';

@Entity('car_models')
export class CarModelEntity extends BaseModel {
  @Column('text')
  model: string;

  @Column('text')
  brandId: string;
  @ManyToOne(() => CarBrandEntity, (entity) => entity.models, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brand_id' })
  brand: CarBrandEntity;

  @OneToMany(() => CarEntity, (entity) => entity.model_link)
  cars?: CarEntity[];
}
