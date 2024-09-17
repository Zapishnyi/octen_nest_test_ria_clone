import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { CurrencyEnum } from '../../modules/cars/enums/currency.enum';
import { BaseModel } from './base_model/base.model';
import { CarBrandEntity } from './car-brand.entity';
import { CarModelEntity } from './car-model.entity';
import { ShowChosenEntity } from './show-chosen.entity';
import { ShowListEntity } from './show-list.entity';
import { UserEntity } from './user.entity';

@Entity('cars')
export class CarEntity extends BaseModel {
  @Column('text', { nullable: false })
  brand: string;
  @Column('text', { nullable: false })
  model: string;

  @Column('text', { nullable: false })
  mileage: string;

  @Column('integer', { nullable: false })
  price: number;

  @Column('enum', { enum: CurrencyEnum, nullable: false })
  currency: CurrencyEnum;

  @Column('text', { nullable: false })
  build: string;

  @Column('simple-array', { nullable: false, default: [] })
  image: string[];

  @Column('text', { unique: true })
  userId: string;

  @ManyToOne(() => UserEntity, (entity) => entity.cars, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @OneToMany(() => ShowListEntity, (entity) => entity.car)
  showsInList?: ShowListEntity[];

  @OneToMany(() => ShowChosenEntity, (entity) => entity.car)
  showsChosen?: ShowChosenEntity[];

  @Column('text', { unique: true })
  brandId: string;
  @ManyToOne(() => CarBrandEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'brandId' })
  brand_link: CarBrandEntity;

  @Column('text', { unique: true })
  modelId: string;
  @ManyToOne(() => CarModelEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'modelId' })
  model_link: CarBrandEntity;
}
