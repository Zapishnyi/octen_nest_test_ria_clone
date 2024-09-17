import { AdminRoleEnum } from '../enums/user-role.enum';

export const rolePick = {
  [AdminRoleEnum.ADMIN]: [
    AdminRoleEnum.ADMIN,
    AdminRoleEnum.MANAGER,
    AdminRoleEnum.USER,
  ],
  [AdminRoleEnum.MANAGER]: [AdminRoleEnum.MANAGER, AdminRoleEnum.USER],
};
