import { Entity, ManyToOne } from 'typeorm';

import { BaseModel } from './base_model/base.model';
import { CarEntity } from './car.entity';

@Entity('show_chosen')
export class ShowChosenEntity extends BaseModel {
  @ManyToOne(() => CarEntity, (entity) => entity.ShowsChosen, {
    onDelete: 'CASCADE',
  })
  car?: CarEntity;
}
