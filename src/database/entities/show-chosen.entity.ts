import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './base_model/base.model';
import { CarEntity } from './car.entity';

@Entity('show_chosen')
export class ShowChosenEntity extends BaseModel {
  @Column('text', { unique: true })
  carId: string;

  @ManyToOne(() => CarEntity, (entity) => entity.showsChosen, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'carId' })
  car?: CarEntity;
}
