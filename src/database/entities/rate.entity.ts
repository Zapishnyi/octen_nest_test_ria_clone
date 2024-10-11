import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CarEntity } from './car.entity';

@Entity('rate')
export class RateEntity {
  @PrimaryColumn('text', {
    default: 'marker',
  })
  marker: string;

  @Column('float')
  buy_eur: number;

  @Column('float')
  sale_eur: number;

  @Column('float')
  buy_usd: number;

  @Column('float')
  sale_usd: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => CarEntity, (entity) => entity.rate)
  cars?: CarEntity[];
}
