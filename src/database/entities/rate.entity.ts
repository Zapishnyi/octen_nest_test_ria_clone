import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { MarkerEnum } from '../../modules/repository/enums/marker.enum';

@Entity('rate')
export class RateEntity {
  @PrimaryColumn('enum', {
    enum: MarkerEnum,
    default: MarkerEnum.MARKER,
  })
  marker: MarkerEnum;

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
}
