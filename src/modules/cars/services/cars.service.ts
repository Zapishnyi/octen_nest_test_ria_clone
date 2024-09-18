import { Injectable } from '@nestjs/common';

import { CarRepository } from '../../repository/services/car-repository.service';

@Injectable()
export class CarsService {
  constructor(private readonly carRepository: CarRepository) {}

  public async create() // { user }: IUserData,
  // brandId: string,
  // dto: CarReqDto,
  : Promise<any> {
    // public async search(
    //
    return;
    // await this.carRepository.save(
    //   this.carRepository.create({ ...dto, userId: user.id, brandId }),
    // );
  }

  // public async delete(
  // public async update(
}
