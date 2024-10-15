import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';
import { CapitalTypeEnum } from '../../enums/capital-type.enum';
import { CountryEnum } from '../../enums/country.enum';
import { CountryISOEnum } from '../../enums/country-iso.enum';

export class LocationReqDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30, {
    message: (args) => {
      return `The value '${args.value}' must be between 3 or 30 characters long.`;
    },
  })
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'City name',
    example: 'Odesa',
  })
  public readonly city: string;

  @IsNotEmpty()
  @IsNumber()
  @IsLatitude()
  @ApiProperty({
    description: 'Latitude',
    example: 34.2588,
  })
  public readonly lat: number;

  @IsNotEmpty()
  @IsNumber()
  @IsLongitude()
  @ApiProperty({
    description: 'Longitude',
    example: 34.2588,
  })
  public readonly lng: number;

  @IsString()
  @IsEnum(CountryEnum, {
    message: 'Country must be : Ukraine',
  })
  @Transform(TransformHelper.trim)
  @ApiProperty({ enum: CountryEnum, default: CountryEnum.UKRAINE })
  public readonly country: CountryEnum;

  @IsString()
  @IsEnum(CountryISOEnum, {
    message: 'Country ISO abbreviation must be : UA',
  })
  @Transform(TransformHelper.trim)
  @ApiProperty({ enum: CountryISOEnum, default: CountryISOEnum.UKRAINE })
  public readonly iso2: CountryISOEnum;
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  @Transform(TransformHelper.trim)
  public readonly region: string;

  @IsString()
  @IsEnum(CapitalTypeEnum, {
    message: 'City role in Area',
  })
  @Transform(TransformHelper.trim)
  @ApiProperty({ enum: CapitalTypeEnum, default: CapitalTypeEnum.VOID })
  public readonly capital: CapitalTypeEnum;
}
