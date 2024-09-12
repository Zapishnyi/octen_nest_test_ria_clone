import { Entity, ManyToOne } from 'typeorm';

import { BaseModel } from './base_model/base.model';
import { CarEntity } from './car.entity';

@Entity('show_list')
export class ShowListEntity extends BaseModel {
  @ManyToOne(() => CarEntity, (entity) => entity.ShowsInList, {
    onDelete: 'CASCADE',
  })
  car?: CarEntity;
}
