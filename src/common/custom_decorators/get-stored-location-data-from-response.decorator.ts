import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetStoredLocationDataFromResponse = createParamDecorator(
  (data, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().location_data;
  },
);
