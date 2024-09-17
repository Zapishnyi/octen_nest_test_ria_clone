import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { GlobalExceptionFilter } from '../common/filters/global-exeption.filter';
import { AuthModule } from './auth/auth.module';
import { CarBrandModelModule } from './car-brand-model/car-brand-model.module';
import { CarsModule } from './cars/cars.module';
import { EnvConnectionModule } from './env-connection/env-connection.module';
import { HealthModule } from './health/health.module';
import { MailModule } from './mailer/mail.module';
import { PostgresModule } from './postgres/postgres.module';
import { RedisModule } from './redis/redis.module';
import { RepositoryModule } from './repository/repository.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PostgresModule,
    HealthModule,
    UsersModule,
    AuthModule,
    CarsModule,
    RedisModule,
    RepositoryModule,
    AuthModule,
    EnvConnectionModule,
    MailModule,
    CarBrandModelModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
