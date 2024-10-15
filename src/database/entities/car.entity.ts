import { Column, Entity, ManyToOne, OneToMany, VersionColumn } from 'typeorm';

import { CurrencyEnum } from '../../modules/cars/enums/currency.enum';
import { BaseModel } from './base_model/base.model';
import { CarBrandEntity } from './car-brand.entity';
import { CarModelEntity } from './car-model.entity';
import { LocationEntity } from './location.entity';
import { RateEntity } from './rate.entity';
import { ShowChosenEntity } from './show-chosen.entity';
import { ShowListEntity } from './show-list.entity';
import { UserEntity } from './user.entity';

@Entity('car')
export class CarEntity extends BaseModel {
  @Column('integer', { nullable: false })
  mileage: number;

  @Column('integer', { nullable: false })
  build: number;

  @Column('integer', { nullable: false })
  price: number;

  @Column('enum', {
    enum: CurrencyEnum,
    nullable: false,
    default: CurrencyEnum.UAH,
  })
  currency: CurrencyEnum;

  @Column('text', { nullable: true, default: null })
  description?: string;

  @Column('boolean', { nullable: false, default: false })
  active: boolean;

  @VersionColumn()
  version: number;

  @Column('text', { array: true, nullable: false, default: [] })
  image?: string[];

  @ManyToOne(() => UserEntity, (entity) => entity.cars, { onDelete: 'CASCADE' })
  user: UserEntity;

  @OneToMany(() => ShowListEntity, (entity) => entity.car)
  shows_in_list?: ShowListEntity[];

  @OneToMany(() => ShowChosenEntity, (entity) => entity.car)
  shows_chosen?: ShowChosenEntity[];

  @ManyToOne(() => CarBrandEntity, (entity) => entity.cars)
  brand: CarBrandEntity;

  @ManyToOne(() => CarModelEntity, (entity) => entity.cars)
  model: CarModelEntity;

  @ManyToOne(() => RateEntity, (entity) => entity.cars)
  rate?: RateEntity;

  @ManyToOne(() => LocationEntity, (entity) => entity.cars)
  location?: LocationEntity;
}
