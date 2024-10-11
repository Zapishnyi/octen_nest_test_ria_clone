import { PickType } from '@nestjs/swagger';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { BaseModel } from './base_model/base.model';
import { CarEntity } from './car.entity';
import { CarModelEntity } from './car-model.entity';

@Entity('car_brand')
export class CarBrandEntity extends PickType(BaseModel, [
  'created',
  'updated',
]) {
  @PrimaryColumn('text', { unique: true })
  name: string;

  @OneToMany(() => CarModelEntity, (entity) => entity.brand)
  models?: CarModelEntity[];

  @OneToMany(() => CarEntity, (entity) => entity.brand)
  cars?: CarEntity[];
}
