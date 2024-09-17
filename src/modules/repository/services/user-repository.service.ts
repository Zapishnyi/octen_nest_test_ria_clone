import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/interfaces/IUserData';
import { rolePick } from '../../users/constants/rolePick';
import { GetUsersQueryReqDto } from '../../users/dto/req/getUsersQuery.req.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async getUsers(
    userData: IUserData,
    { search, page, limit, plan, role }: GetUsersQueryReqDto,
  ): Promise<[UserEntity[], number]> {
    try {
      const queryResult = this.createQueryBuilder('users')
        .leftJoinAndSelect('users.cars', 'cars')
        .take(limit)
        .skip((page - 1) * limit)
        .orderBy({ 'users.created': 'ASC' })
        .andWhere('users.role IN (:...roles)', {
          roles: rolePick[userData.user.role],
        });
      if (role) {
        queryResult.andWhere('users.role = :role', { role });
      }
      if (plan) {
        queryResult.andWhere('users.plan = :plan', { plan });
      }
      if (search) {
        queryResult.andWhere(
          'CONCAT(users.id, users.email, users.first_name, users.last_name, users.phone) ILIKE :search',
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
