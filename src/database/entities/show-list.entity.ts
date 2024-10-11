import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './base_model/base.model';
import { CarEntity } from './car.entity';

@Entity('show_list')
export class ShowListEntity extends BaseModel {
  @Column('text')
  car_id: string;
  @ManyToOne(() => CarEntity, (entity) => entity.shows_in_list, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'car_id' })
  car?: CarEntity;
}
