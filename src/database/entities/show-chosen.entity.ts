import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './base_model/base.model';
import { CarEntity } from './car.entity';

@Entity('show_chosen')
export class ShowChosenEntity extends BaseModel {
  @Column('text', { unique: true })
  car_id: string;

  @ManyToOne(() => CarEntity, (entity) => entity.shows_chosen, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'car_id' })
  car?: CarEntity;
}
