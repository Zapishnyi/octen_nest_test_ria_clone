import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { RedisModule } from '../redis/redis.module';
import { RepositoryModule } from '../repository/repository.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AuthAccessService } from './services/auth-access.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [
    RepositoryModule,
    JwtModule,
    RedisModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [AuthAccessService, AuthService, TokenService],
  exports: [AuthAccessService, AuthService],
})
export class AuthModule {}
