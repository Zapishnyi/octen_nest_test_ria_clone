import { ConflictException, Injectable } from '@nestjs/common';

import { LocationEntity } from '../../../database/entities/location.entity';
import { LocationRepositoryService } from '../../repository/services/location-repository.service';
import { LocationDeleteQueryReqDto } from '../dto/req/location-delete-query.req.dto';
import { LocationListReqDto } from '../dto/req/location-list.req.dto';
import { LocationQueryReqDto } from '../dto/req/location-query.req.dto';
import { LocationResDto } from '../dto/res/location.res.dto';
import { LocationPresenterService } from './location-presenter.service';

@Injectable()
export class LocationService {
  constructor(
    public readonly locationRepository: LocationRepositoryService,
    public readonly locationPresenter: LocationPresenterService,
  ) {}

  public async getLocations({
    locations,
  }: LocationQueryReqDto): Promise<LocationEntity[]> {
    return await this.locationRepository.getLocations(locations);
  }

  public async addLocations({
    locations,
  }: LocationListReqDto): Promise<LocationResDto[]> {
    const isLocationExist = await this.locationRepository.getLocations(
      locations.map((location) => location.city),
    );
    if (isLocationExist.length) {
      throw new ConflictException({
        message: `Cities: ${isLocationExist.map((location) => location.city).join(', ')} are exists in database`,
      });
    }

    const locationEntities = await this.locationRepository.save(
      locations.map((location) => this.locationRepository.create(location)),
    );
    return locationEntities.map((location) =>
      this.locationPresenter.toResponseDto(location),
    );
  }

  public async deleteLocations({
    locations,
  }: LocationDeleteQueryReqDto): Promise<void> {
    const isLocationExist =
      await this.locationRepository.getLocations(locations);
    if (!isLocationExist.length) {
      throw new ConflictException({
        message: `${locations.length === 1 ? 'City' : 'Cities'}: ${locations.map((location) => location).join(', ')}
         ${locations.length === 1 ? 'is' : 'are'} not exists in database`,
      });
    }

    await this.locationRepository.delete(
      isLocationExist.map((location) => location.city),
    );
  }
}
