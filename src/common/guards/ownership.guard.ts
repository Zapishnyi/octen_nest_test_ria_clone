import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { IUserData } from '../../modules/auth/interfaces/IUserData';
import { CarRepository } from '../../modules/repository/services/car-repository.service';
import { AdminRoleEnum } from '../../modules/users/enums/user-role.enum';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private readonly carRepository: CarRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request['user_data'] as IUserData;

    const car = await this.carRepository.findOne({
      where: { id: request.params.car_id },
      relations: ['user'],
    });

    if (!car) {
      throw new NotFoundException('Car does not exist');
    }
    if (car.user.id !== user.id && user.role === AdminRoleEnum.USER) {
      throw new UnauthorizedException();
    }

    request.car_data = {
      car,
    };
    return true;
  }
}
