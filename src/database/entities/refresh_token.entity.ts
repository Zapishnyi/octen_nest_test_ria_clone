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
  deviceId: string;

  @Column('text')
  userId: string;

  @ManyToOne(() => UserEntity, (entity) => entity.refresh_tokens, {
    // When you set onDelete: 'CASCADE' on a foreign key, it means that if a row in the parent table is deleted,
    // all rows in the child table that reference the deleted row will also be automatically deleted.
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;
}
