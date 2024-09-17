import { ConflictException, Injectable } from '@nestjs/common';

import { CarBrandEntity } from '../../../database/entities/car-brand.entity';
import { CarBrandRepository } from '../../repository/services/car-brand-repository.service';
import { CarModelRepository } from '../../repository/services/car-model-repository.service';
import { CarModelListReqDto } from '../dto/req/car-model.req.dto';

@Injectable()
export class CarModelService {
  constructor(
    private readonly carBrandRepository: CarBrandRepository,
    private readonly carModelRepository: CarModelRepository,
  ) {}

  public async addModels(dto: CarModelListReqDto): Promise<CarBrandEntity> {
    const brand = await this.carBrandRepository.brandExist([dto.brand]);
    if (!brand.length) {
      throw new ConflictException({
        message: `Brand: ${dto.brand} is not exists in database`,
      });
    }
    const modelsExist = await this.carModelRepository.modelExist(dto.modelList);
    if (modelsExist.length) {
      throw new ConflictException({
        message: `Models: ${modelsExist.map((model) => model.model).join(', ')} are exists in database`,
      });
    }
    const models = await this.carModelRepository.save(
      dto.modelList.map((model) =>
        this.carModelRepository.create({ model, brandId: brand[0].id }),
      ),
    );

    const result = this.carBrandRepository.merge(brand[0], {
      ...brand[0],
      models,
    });

    return await this.carBrandRepository.save(result);
  }

  public async deleteModels({ modelList }: CarModelListReqDto): Promise<void> {
    const modelsExist = await this.carModelRepository.modelExist(modelList);
    if (modelsExist.length !== modelList.length) {
      const modelsNotExist = modelList.filter(
        (model) =>
          !modelsExist
            .map((modelExist) => modelExist.model.toLowerCase())
            .includes(model.toLowerCase()),
      );
      throw new ConflictException({
        message: `Models: ${modelsNotExist.join(', ')} are not exists in database`,
      });
    }
    await this.carModelRepository.delete(modelsExist.map((model) => model.id));
  }
}
