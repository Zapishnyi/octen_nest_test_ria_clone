import { Module } from '@nestjs/common';

import { AwsStorageService } from './services/aws-storage.service';

@Module({
  controllers: [],
  providers: [AwsStorageService],
  exports: [AwsStorageService],
})
export class AwsStorageModule {}
