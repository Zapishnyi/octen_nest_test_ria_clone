import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './base_model/base.model';
import { UserEntity } from './user.entity';

// @Index(['deviceId', 'userId']) /* indexing by several fields*/
@Entity('refresh_tokens')
export class RefreshTokenEntity extends BaseModel {
  @Column('text')
  refresh: string;

  @Index() /* index speed up search in database, sorting data in special order*/
  @Column('text')
  device: string;

  @Column('text')
  user_id: string;

  @ManyToOne(() => UserEntity, (entity) => entity.refresh_tokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
