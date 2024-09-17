import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { MailModule } from '../mailer/mail.module';
import { RedisModule } from '../redis/redis.module';
import { RepositoryModule } from '../repository/repository.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AuthAccessService } from './services/auth-access.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [
    MailModule,
    RepositoryModule,
    JwtModule,
    RedisModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthAccessService,
    AuthService,
    TokenService,
    // {
    //   /*To implement authorization guard to all endpoints globally*/
    //   provide: APP_GUARD,
    //   useClass: JwtAccessGuard,
    // },
  ],
  exports: [AuthAccessService, AuthService, TokenService],
})
export class AuthModule {}
