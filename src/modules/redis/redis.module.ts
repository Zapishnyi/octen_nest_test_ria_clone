import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

import { EnvConfigType, RedisConfigType } from '../../configs/envConfigType';
import { REDIS_CLIENT } from './redis.constant';
import { RedisService } from './redis.service';

// export const REDIS_CLIENT = 'REDIS_CLIENT';

const redisProvider: Provider = {
  useFactory: (envConfig: ConfigService<EnvConfigType>) => {
    const { port, host, password } = envConfig.get<RedisConfigType>('redis');

    return new Redis({
      port,
      host,
      password,
    });
  },
  inject: [ConfigService],
  provide: REDIS_CLIENT,
};

@Module({
  providers: [redisProvider, RedisService],
  exports: [redisProvider, RedisService],
})
export class RedisModule {}
