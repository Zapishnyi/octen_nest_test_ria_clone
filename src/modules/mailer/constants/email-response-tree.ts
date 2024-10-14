import { EmailTypeEnum } from '../enums/email-type.enum';

export const emailResponseTree = {
  [EmailTypeEnum.ADMIN_GREETING]: {
    subject: 'Application started',
    template: 'admin_welcome',
  },
  [EmailTypeEnum.MANAGER_PROFANITY_NOTICE]: {
    subject: 'Profanity violation notice',
    template: 'profanity_notice',
  },
};
