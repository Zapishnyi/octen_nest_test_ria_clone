import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetStoredCarDataFromResponse = createParamDecorator(
  (data, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().car_data;
  },
);
