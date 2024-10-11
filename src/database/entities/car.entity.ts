import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

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

  @Column('text', { array: true, nullable: false, default: [] })
  image?: string[];

  // @Column('text')
  // user_id: string;

  @ManyToOne(() => UserEntity, (entity) => entity.cars, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => ShowListEntity, (entity) => entity.car)
  shows_in_list?: ShowListEntity[];

  @OneToMany(() => ShowChosenEntity, (entity) => entity.car)
  shows_chosen?: ShowChosenEntity[];

  // @Column('text')
  // brand: string;

  @ManyToOne(() => CarBrandEntity, (entity) => entity.cars)
  // @JoinColumn({ name: 'brand' })
  brand: CarBrandEntity;

  // @Column('text')
  // model_id: string;

  @ManyToOne(() => CarModelEntity, (entity) => entity.cars)
  // @JoinColumn({ name: 'model_id' })
  model: CarModelEntity;

  // @Column('text')
  // marker: string;

  @ManyToOne(() => RateEntity, (entity) => entity.cars)
  // @JoinColumn({ name: 'marker' })
  rate?: RateEntity;

  // @Column('text')
  // city: string;

  @ManyToOne(() => LocationEntity, (entity) => entity.cars)
  // @JoinColumn({ name: 'city' })
  location?: LocationEntity;
}
