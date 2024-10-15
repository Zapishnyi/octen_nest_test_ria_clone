<<<<<<< HEAD
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CarEntity } from '../../../database/entities/car.entity';
import { IBrandData } from '../../auth/interfaces/IBrandData';
import { IUserData } from '../../auth/interfaces/IUserData';
import { FileContentTypeEnum } from '../../aws-storage/enums/file-content-type.enum';
import { AwsStorageService } from '../../aws-storage/services/aws-storage.service';
import { ILocationData } from '../../location/interfaces/ILocationData.interface';
import { EmailTypeEnum } from '../../mailer/enums/email-type.enum';
import { MailService } from '../../mailer/services/mail.service';
import { CarRepository } from '../../repository/services/car-repository.service';
import { RateRepository } from '../../repository/services/rate-repository.service';
import { UserRepository } from '../../repository/services/user-repository.service';
import { UserPlanEnum } from '../../users/enums/user-plan.enum';
import { AdminRoleEnum } from '../../users/enums/user-role.enum';
import { CarReqDto } from '../dto/req/car.req.dto';
import { CarImageQueryReqDto } from '../dto/req/car-image-type-query.req.dto';
import { CarQueryReqDto } from '../dto/req/car-query.req.dto';
import { CarUpdateReqDto } from '../dto/req/car-update.req.dto';
import { ICarData } from '../interfaces/ICarData.interface';
import { ICarRaw } from '../interfaces/ICarRaw.interface';

@Injectable()
export class CarsService {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly rateRepository: RateRepository,
    private readonly awsStorageService: AwsStorageService,
    private readonly mailService: MailService,
    private readonly userRepository: UserRepository,
  ) {}

  public async create(
    { user }: IUserData,
    { brand, model }: IBrandData,
    { location }: ILocationData,
    dto: CarReqDto,
  ): Promise<CarEntity> {
    if (user.plan === UserPlanEnum.BASE && user.cars.length >= 1) {
      throw new ForbiddenException(
        `Only one advertisement is permitted for owner of 'base' plan`,
      );
    }
    const rate = await this.rateRepository.findOne({
      where: { marker: 'marker' },
    });
    return await this.carRepository.save(
      this.carRepository.create({
        ...dto,
        user: user,
        brand: brand,
        model: model,
        location: location,
        rate: rate,
      }),
    );
  }

  public async search(query: CarQueryReqDto): Promise<[ICarRaw[], number]> {
    return await this.carRepository.search(query);
  }

  public async delete({ car }: ICarData): Promise<void> {
    for (const e of car.image) {
      await this.awsStorageService.deleteFile(e);
    }
    await this.carRepository.delete(car.id);
  }

  public async update(
    { car }: ICarData,
    { brand, model }: IBrandData,
    { user }: IUserData,
    dto: CarUpdateReqDto,
  ): Promise<CarEntity> {
    const updateDto = {
      mileage: dto.mileage,
      price: dto.price,
      build: dto.build,
      description: dto.description,
      currency: dto.currency,
      brand: brand,
      model: model,
      active: dto.active,
      version: car.active && !dto.active ? 1 : undefined,
    };
    await this.carRepository.update(car.id, updateDto);
    const updateResult = await this.carRepository.findOne({
      where: { id: car.id },
      relations: ['brand', 'model', 'location'],
    });
    if (!updateResult.active && updateResult.version > 3) {
      const managers = await this.userRepository.find({
        where: { role: AdminRoleEnum.MANAGER },
      });
      for (const manager of managers) {
        await this.mailService.sendMail(
          EmailTypeEnum.MANAGER_PROFANITY_NOTICE,
          manager.email,
          {
            first_name: manager.first_name,
            last_name: manager.last_name,
            user_id: user.id,
            car_id: car.id,
          },
        );
      }
    }
    return updateResult;
  }

  public async uploadImage(
    { user }: IUserData,
    { car }: ICarData,
    image: Express.Multer.File,
    { image_type }: CarImageQueryReqDto,
  ): Promise<void> {
    const image_type_reassigned = image_type as unknown as FileContentTypeEnum;

    if (
      image_type_reassigned === FileContentTypeEnum.PRIMARY_CAR_IMAGE &&
      car.image.join().includes(FileContentTypeEnum.PRIMARY_CAR_IMAGE)
    ) {
      throw new ConflictException('Primary car image already defined');
    }
    if (car.image.length === 5) {
      throw new ConflictException('Only 5 images are permitted');
    }
    const imagePath = await this.awsStorageService.uploadFile(
      image,
      image_type_reassigned,
      user.id,
      car.id,
    );
    await this.carRepository.update(car.id, {
      image: [...car.image, imagePath],
    });
  }

  public async deleteImage(
    { user }: IUserData,
    { car }: ICarData,
    car_id: string,
    image_id: string,
  ): Promise<void> {
    const pathPattern = `.*${user.id}.*${car_id}.*${image_id}.*`;
    const pathRegExp = new RegExp(pathPattern);
    const filePath = (
      await this.carRepository.findOneBy({ id: car.id })
    ).image.filter((image) => pathRegExp.test(image));
    if (!filePath.length) {
      throw new NotFoundException("Image doesn't exist");
    }
    await this.awsStorageService.deleteFile(filePath[0]);
    await this.carRepository.update(car_id, {
      image: car.image.filter((image) => !pathRegExp.test(image)),
    });
  }
=======
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
>>>>>>> parent of 199533d (image managment corrected)
}
