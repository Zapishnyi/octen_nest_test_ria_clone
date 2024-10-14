import { ApiProperty } from '@nestjs/swagger';

export class CarModelBaseResDto {
  @ApiProperty({ format: 'uuid' })
  public readonly id: string;

  @ApiProperty({ type: 'string', example: 'S3' })
  public readonly model: string;

  public readonly created: Date;

  public readonly updated: Date;

  public readonly cars?: any;
}
