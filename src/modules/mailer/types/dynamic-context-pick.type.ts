import { EmailTypeEnum } from '../enums/email-type.enum';
import { TemplateContextItemsListType } from './template-context-items-list.type';

export type DynamicPickType<T, K extends keyof T> = {
  [P in K]-?: T[P];
};

export type DynamicContextPickType = {
  [EmailTypeEnum.ADMIN_GREETING]: DynamicPickType<
    TemplateContextItemsListType,
    'first_name' | 'last_name' | 'api_docs_url'
  >;
  [EmailTypeEnum.MANAGER_PROFANITY_NOTICE]: DynamicPickType<
    TemplateContextItemsListType,
    'user_id' | 'car_id' | 'first_name' | 'last_name'
  >;
};
