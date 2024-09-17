import { EmailTypeEnum } from '../enums/email-type.enum';

export const emailResponseTree = {
  [EmailTypeEnum.ADMIN_GREETING]: {
    subject: 'Application started',
    template: 'admin_welcome',
  },
};
