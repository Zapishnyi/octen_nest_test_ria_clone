import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LocationQueryReqDto } from './dto/req/location-query.req.dto';
import { LocationResDto } from './dto/res/location.res.dto';
import { LocationService } from './services/location.service';
import { LocationPresenterService } from './services/location-presenter.service';

@ApiTags('6. Locations')
@Controller('location')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private readonly locationPresenter: LocationPresenterService,
  ) {}

  @Get()
  public async getLocations(
    @Query() query: LocationQueryReqDto,
  ): Promise<LocationResDto[]> {
    return (await this.locationService.getLocations(query)).map((entity) =>
      this.locationPresenter.toResponseDto(entity),
    );
  }
}
