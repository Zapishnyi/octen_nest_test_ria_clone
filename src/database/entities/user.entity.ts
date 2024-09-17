import { Column, Entity, OneToMany } from 'typeorm';

import { UserPlanEnum } from '../../modules/users/enums/user-plan.enum';
import { AdminRoleEnum } from '../../modules/users/enums/user-role.enum';
import { BaseModel } from './base_model/base.model';
import { CarEntity } from './car.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity('users')
export class UserEntity extends BaseModel {
  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false, unique: true })
  password: string;

  @Column('text', { nullable: true })
  phone: string;

  @Column('enum', { enum: AdminRoleEnum, default: AdminRoleEnum.USER })
  role: AdminRoleEnum;

  @Column('enum', { enum: UserPlanEnum, default: UserPlanEnum.BASE })
  plan: UserPlanEnum;

  @Column('boolean', { default: false })
  verify: boolean;

  @Column('boolean', { default: false })
  ban: boolean;

  @Column('text', { nullable: true })
  avatar_image?: string;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refresh_tokens?: RefreshTokenEntity[];

  @OneToMany(() => CarEntity, (entity) => entity.user)
  cars?: CarEntity[];
}
