import { ConflictException, Injectable } from '@nestjs/common';

import { CarBrandEntity } from '../../../database/entities/car-brand.entity';
import { CarBrandRepository } from '../../repository/services/car-brand-repository.service';
import { CarBrandListReqDto } from '../dto/req/car-brand-list.req.dto';
import { GetBrandsModelsQueryReqDto } from '../dto/req/get-brand-model-query.req.dto';
import { CarBrandListResDto } from '../dto/res/car_brand-list.res.dto';
import { CarBrandPresenterService } from './car-brand-presenter.service';

@Injectable()
export class CarBrandService {
  constructor(
    private readonly carBrandRepository: CarBrandRepository,
    private readonly carBrandPresenter: CarBrandPresenterService,
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
  }: CarBrandListReqDto): Promise<CarBrandEntity[]> {
    const isBrandsExist = await this.carBrandRepository.brandExist(brandList);
    if (isBrandsExist.length) {
      throw new ConflictException({
        message: `Brands: ${isBrandsExist.map((brand) => brand.brand).join(', ')} are exists in database`,
      });
    }

    return await this.carBrandRepository.save(
      brandList.map((brand) => this.carBrandRepository.create({ brand })),
    );
  }

  public async deleteBrands({ brandList }: CarBrandListReqDto): Promise<void> {
    const isBrandsExist = await this.carBrandRepository.brandExist(brandList);
    if (isBrandsExist.length !== brandList.length) {
      const brandsNotExist = brandList.filter(
        (brand) =>
          !isBrandsExist
            .map((brandExist) => brandExist.brand.toLowerCase())
            .includes(brand.toLowerCase()),
      );
      throw new ConflictException({
        message: `Brands: ${brandsNotExist.join(', ')} are not exists in database`,
      });
    }
    await this.carBrandRepository.delete(
      isBrandsExist.map((brand) => brand.id),
    );
  }
}
