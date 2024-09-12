import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetStoredDataFromResponse = createParamDecorator(
  (data, context: ExecutionContext) => {
    //When you call context.switchToHttp(), you are explicitly telling NestJS that you want
    // to switch the execution context to an HTTP context.
    // This is useful because the ExecutionContext could be dealing
    // with different types of requests (like WebSocket messages or RPC calls),
    // but switchToHttp() makes it clear that you want to work with HTTP-specific methods and properties.
    // After calling switchToHttp(), you can use methods like:
    // getRequest(): to get the HTTP request object.
    // getResponse(): to get the HTTP response object.
    // getNext(): to get the next function (used in middleware).
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
