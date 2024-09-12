import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ShowListEntity } from '../../../database/entities/show_list.entity';

@Injectable()
export class ShowListRepository extends Repository<ShowListEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ShowListEntity, dataSource.manager);
  }
}
