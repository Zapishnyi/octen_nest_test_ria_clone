import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './base_model/base.model';
import { CarEntity } from './car.entity';

@Entity('show_list')
export class ShowListEntity extends BaseModel {
  @Column('text')
  carId: string;
  @ManyToOne(() => CarEntity, (entity) => entity.showsInList, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'carId' })
  car?: CarEntity;
}
