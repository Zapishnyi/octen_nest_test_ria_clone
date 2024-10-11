import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { RateRepository } from '../../modules/repository/services/rate-repository.service';

@Injectable()
export class RateUpdateCroneService {
  constructor(private readonly rateRepository: RateRepository) {}

  @Cron('0 0 12 * * *')
  async handleCron() {
    await this.rateRepository.updateCurrency();
  }
}
