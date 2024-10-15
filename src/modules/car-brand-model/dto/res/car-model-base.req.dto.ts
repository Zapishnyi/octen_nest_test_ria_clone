import { ApiProperty } from '@nestjs/swagger';

export class CarModelResDto {
  @ApiProperty({ format: 'uuid' })
  public readonly id: string;

  @ApiProperty({ type: 'string', example: 'S3' })
  public readonly model: string;

  @ApiProperty({ format: 'uuid' })
  public readonly brandId: string;

  public readonly created: Date;

  public readonly updated: Date;

  public readonly cars?: any;
}
