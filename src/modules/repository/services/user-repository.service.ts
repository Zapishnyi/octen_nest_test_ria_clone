import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/interfaces/IUserData';
import { rolePick } from '../../users/constants/rolePick';
import { GetUsersQueryReqDto } from '../../users/dto/req/get-users-query.req.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async getUsers(
    userData: IUserData,
    { search, page, limit, plan, role, user_id, car_id }: GetUsersQueryReqDto,
  ): Promise<[UserEntity[], number]> {
    try {
      const queryResult = this.createQueryBuilder('user')
        .leftJoinAndSelect('user.cars', 'car')
        .take(limit)
        .skip((page - 1) * limit)
        .orderBy({ 'user.created': 'ASC' })
        .andWhere('user.role IN (:...roles)', {
          roles: rolePick[userData.user.role],
        });
      if (role) {
        queryResult.andWhere('user.role = :role', { role });
      }
      if (plan) {
        queryResult.andWhere('user.plan = :plan', { plan });
      }
      if (user_id) {
        queryResult.andWhere('user.id = :user_id', { user_id });
      }
      if (car_id) {
        queryResult.andWhere('car.id = :car_id', { car_id });
      }
      if (search) {
        queryResult.andWhere(
          'CONCAT(users.id, user.email, user.first_name, user.last_name, user.phone) ILIKE :search',
          {
            search: `%${search}%`,
          },
        );
      }

      return await queryResult.getManyAndCount();
    } catch (err) {
      throw new Error(err);
    }
  }
}
