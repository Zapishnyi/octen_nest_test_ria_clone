import { Injectable } from '@nestjs/common';

import { CarBrandRepository } from '../../../repository/services/car-brand-repository.service';
import { CarModelRepository } from '../../../repository/services/car-model-repository.service';

@Injectable()
export class CarModelService {
  constructor(
    private readonly carBrandRepository: CarBrandRepository,
    private readonly carModelRepository: CarModelRepository,
  ) {}

  // public async addModels(dto: CarModelListReqDto): Promise<CarBrandEntity> {
  //   const brand = await this.carBrandRepository.brandExist([dto.brand_name]);
  //   if (!brand.length) {
  //     throw new ConflictException({
  //       message: `Brand: ${dto.brand_name} is not exists in database`,
  //     });
  //   }
  //   const modelsExist = await this.carModelRepository.modelExist(
  //     dto.modelList,
  //     brand[0].id,
  //   );
  //   if (modelsExist.length) {
  //     throw new ConflictException({
  //       message: `Models: ${modelsExist.map((model) => model.name).join(', ')} are exists in database`,
  //     });
  //   }
  //   const modelsList = await this.carModelRepository.findBy({
  //     brand_id: brand[0].id,
  //   });
  //   const models = await this.carModelRepository.save([
  //     ...modelsList,
  //     ...dto.modelList.map((model) =>
  //       this.carModelRepository.create({ name: model, brand_id: brand[0].id }),
  //     ),
  //   ]);

  //   const result = this.carBrandRepository.merge(brand[0], {
  //     ...brand[0],
  //     models,
  //   });
  //
  //   return await this.carBrandRepository.save(result);
  // }

  // public async deleteModels({
  //   modelList,
  //   brand_name,
  // }: CarModelListReqDto): Promise<void> {
  //   const brand = await this.carBrandRepository.brandExist([brand_name]);
  //   const modelsExist = await this.carModelRepository.modelExist(
  //     modelList,
  //     brand[0].id,
  //   );
  //   if (modelsExist.length !== modelList.length) {
  //     const modelsNotExist = modelList.filter(
  //       (model) =>
  //         !modelsExist
  //           .map((modelExist) => modelExist.name.toLowerCase())
  //           .includes(model.toLowerCase()),
  //     );
  //     throw new ConflictException({
  //       message: `Models: ${modelsNotExist.join(', ')} are not exists in database`,
  //     });
  //   }
  //   await this.carModelRepository.delete(modelsExist.map((model) => model.id));
  // }
}
