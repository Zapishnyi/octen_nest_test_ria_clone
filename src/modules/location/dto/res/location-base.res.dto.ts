import { ApiProperty } from '@nestjs/swagger';

import { CapitalTypeEnum } from '../../enums/capital-type.enum';
import { CountryEnum } from '../../enums/country.enum';
import { CountryISOEnum } from '../../enums/country-iso.enum';

export class LocationBaseResDto {
  @ApiProperty({ format: 'uuid' })
  public readonly id: string;

  @ApiProperty({
    description: 'City name',
    example: 'Odesa',
  })
  public readonly city: string;

  @ApiProperty({
    description: 'Latitude',
    example: 34.2588,
  })
  public readonly lat: number;

  @ApiProperty({
    description: 'Longitude',
    example: 34.2588,
  })
  public readonly lng: number;

  @ApiProperty({ enum: CountryEnum, default: CountryEnum.UKRAINE })
  public readonly country: CountryEnum;

  @ApiProperty({ enum: CountryISOEnum, default: CountryISOEnum.UKRAINE })
  public readonly iso2: CountryISOEnum;

  public readonly region: string;

  @ApiProperty({ enum: CapitalTypeEnum, default: CapitalTypeEnum.VOID })
  public readonly capital: CapitalTypeEnum;

  public readonly created: Date;

  public readonly updated: Date;
}
