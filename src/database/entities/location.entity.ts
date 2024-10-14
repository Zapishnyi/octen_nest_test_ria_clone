import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { CapitalTypeEnum } from '../../modules/location/enums/capital-type.enum';
import { CountryEnum } from '../../modules/location/enums/country.enum';
import { CountryISOEnum } from '../../modules/location/enums/country-iso.enum';
import { CarEntity } from './car.entity';

@Entity('location')
export class LocationEntity {
  @PrimaryColumn('text', { unique: true, nullable: false })
  city: string;

  @Column('decimal', { precision: 6, scale: 4 })
  lat: number;

  @Column('decimal', { precision: 6, scale: 4 })
  lng: number;

  @Column('enum', { enum: CountryEnum, default: CountryEnum.UKRAINE })
  country: CountryEnum;

  @Column('enum', { enum: CountryISOEnum, default: CountryISOEnum.UKRAINE })
  iso2: CountryISOEnum;

  @Column('text')
  region: string;

  @Column('enum', { enum: CapitalTypeEnum, default: CapitalTypeEnum.VOID })
  capital: CapitalTypeEnum;

  @OneToMany(() => CarEntity, (entity) => entity.location)
  cars: CarEntity[];
}
