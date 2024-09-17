import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetStoredUserDataFromResponse = createParamDecorator(
  (data, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user_data;
  },
);
