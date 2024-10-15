import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('7.Health')
@Controller('health')
export class HealthController {
  @Get()
  public health(): string {
    return 'health';
  }
}
