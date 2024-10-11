import { ConflictException, Injectable } from '@nestjs/common';

import { CarBrandRepository } from '../../repository/services/car-brand-repository.service';
import { CarModelRepository } from '../../repository/services/car-model-repository.service';
import { CarBrandListReqDto } from '../dto/req/car-brand-list.req.dto';
import { GetBrandsModelsQueryReqDto } from '../dto/req/get-brand-model-query.req.dto';
import { CarBrandResDto } from '../dto/res/car-brand.res.dto';
import { CarBrandListResDto } from '../dto/res/car-brand-list.res.dto';
import { CarBrandPresenterService } from './car-brand-presenter.service';

@Injectable()
export class CarBrandService {
  constructor(
    private readonly carBrandRepository: CarBrandRepository,
    private readonly carBrandPresenter: CarBrandPresenterService,
    private readonly carModelRepository: CarModelRepository,
  ) {}

  public async getBrandsModels(
    query: GetBrandsModelsQueryReqDto,
  ): Promise<CarBrandListResDto> {
    const [brandEntities, total] =
      await this.carBrandRepository.getBradsModels(query);
    return this.carBrandPresenter.toResponseListDto(
      brandEntities,
      query,
      total,
    );
  }

  public async addBrands({
    brandList,
  }: CarBrandListReqDto): Promise<CarBrandResDto[]> {
    const isBrandsExist = await this.carBrandRepository.brandExist(brandList);

    if (isBrandsExist.length) {
      throw new ConflictException({
        message: `Brands: ${isBrandsExist.map((brand) => brand.name).join(', ')} with models:${isBrandsExist
          .map(({ models }) => models.map((model) => model.name))
          .flat()
          .join(', ')} are exists in database`,
      });
    }
    const entityArray = await Promise.all(
      brandList.map(async ({ brand, models }) => {
        const modelEntities = await Promise.all(
          models.map(
            async (model) =>
              await this.carModelRepository.save(
                this.carModelRepository.create({ name: model }),
              ),
          ),
        );
        return await this.carBrandRepository.save(
          this.carBrandRepository.create({
            name: brand,
            models: modelEntities,
          }),
        );
      }),
    );
    return entityArray.map((entity) =>
      this.carBrandPresenter.toResponseDto(entity),
    );
  }

  public async deleteBrands({ brandList }: CarBrandListReqDto): Promise<void> {
    const isBrandsExist = await this.carBrandRepository.brandExist(brandList);
    if (isBrandsExist.length !== brandList.length) {
      const brandsNotExist = brandList.filter((brand) =>
        isBrandsExist
          .map((brandExist) => brandExist.name.toLowerCase())
          .includes(brand.brand.toLowerCase()),
      );
      throw new ConflictException({
        message: `Brands: ${brandsNotExist.join(', ')} are not exists in database`,
      });
    }
    await this.carBrandRepository.delete(
      isBrandsExist.map((brand) => brand.name),
    );
  }
}
