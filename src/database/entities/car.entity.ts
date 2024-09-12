import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseModel } from './base_model/base.model';
import { CarBrandEntity } from './car_brand.entity';
import { ShowChosenEntity } from './show_chosen.entity';
import { ShowListEntity } from './show_list.entity';
import { UserEntity } from './user.entity';

@Entity('cars')
export class CarEntity extends BaseModel {
  @Column('text', { unique: true })
  model: string;

  @Column('text', { nullable: false })
  mileage: string;

  @Column('integer', { nullable: false })
  price: number;

  @Column('text', { nullable: false })
  build: string;

  @Column('simple-array', { nullable: false })
  image: string[];

  @ManyToOne(() => UserEntity, (entity) => entity.cars, { onDelete: 'CASCADE' })
  user: UserEntity;

  @OneToMany(() => ShowListEntity, (entity) => entity.car)
  ShowsInList?: ShowListEntity[];

  @OneToMany(() => ShowChosenEntity, (entity) => entity.car)
  ShowsChosen?: ShowChosenEntity[];

  @ManyToOne(() => CarBrandEntity, (entity) => entity.cars)
  brand: CarBrandEntity;
}
