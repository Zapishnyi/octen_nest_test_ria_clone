import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

export const ApiFile = (
  fileName: string,
  isArray = true,
  isRequired = true,
  size: string,
): MethodDecorator => {
  return applyDecorators(
    ApiBody({
      description:
        'Upload a user avatar image. The file should be in JPG, JPEG, PNG, GIF,' +
        ` or WEBP format and should not exceed ${size}.`,
      schema: {
        type: 'object',
        required: isRequired ? [fileName] : [],
        properties: {
          [fileName]: isArray
            ? {
                type: 'array',
                items: {
                  type: 'string',
                  format: 'binary',
                  description: 'The image file to upload.',
                },
              }
            : {
                type: 'string',
                format: 'binary',
                description: 'The image file to upload.',
              },
        },
      },
    }),
  );
};
