import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetStoredBrandDataFromResponse = createParamDecorator(
  (data, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().brand_data;
  },
);
