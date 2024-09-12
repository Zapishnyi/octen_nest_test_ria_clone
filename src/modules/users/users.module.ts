import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { AwsStorageModule } from '../aws-storage/aws-storage.module';
import { RepositoryModule } from '../repository/repository.module';
import { UserPresenterService } from './services/user-presenter.service';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [forwardRef(() => AuthModule), AwsStorageModule, RepositoryModule],
  controllers: [UsersController],
  providers: [UsersService, UserPresenterService],
  exports: [UsersService, UserPresenterService],
})
export class UsersModule {}
