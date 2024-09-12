import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ShowChosenEntity } from '../../../database/entities/show_chosen.entity';

@Injectable()
export class ShowChosenRepository extends Repository<ShowChosenEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ShowChosenEntity, dataSource.manager);
  }
}
