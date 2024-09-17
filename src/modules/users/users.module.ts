import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { AwsStorageModule } from '../aws-storage/aws-storage.module';
import { CarBrandModelModule } from '../car-brand-model/car-brand-model.module';
import { RepositoryModule } from '../repository/repository.module';
import { AdminController } from './controllers/admin.controller';
import { ManagerController } from './controllers/manager.controller';
import { UsersController } from './controllers/users.controller';
import { UserPresenterService } from './services/user-presenter.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    AwsStorageModule,
    RepositoryModule,
    CarBrandModelModule,
  ],
  controllers: [UsersController, AdminController, ManagerController],
  providers: [UsersService, UserPresenterService],
  exports: [UsersService, UserPresenterService],
})
export class UsersModule {}
