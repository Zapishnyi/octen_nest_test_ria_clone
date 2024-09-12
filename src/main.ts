import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppConfigType } from './configs/envConfigType';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // add environment configuration to project using @nestjs/config
  const envConfigService = app.get(ConfigService);
  const appEnvConfig = envConfigService.get<AppConfigType>('app');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('OKTEN Nest Home Work API')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth({
      /* Authentication */
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'headers',
    })
    .build();

  // Creation of Swagger document
  const SwaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, SwaggerDocument, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'method',
      // type of lists representation
      docExpansion: 'list',
      // Expansion depth
      defaultModelExpandDepth: 1,
      // eslint-disable-next-line max-len
      // authorization credentials (like an access token, JWT, or session token) will be stored and reused across multiple requests or sessions.
      persistAuthorization: true,
    },
  });

  // Pipes
  app.useGlobalPipes(
    // Validation of DTO
    new ValidationPipe({
      // if DTO without decorators whole DTO won't be allowed
      whitelist: true,
      // In DTO only properties with decorators are allowed
      forbidNonWhitelisted: true,
      //   Allow transformation of Validated DTO properties (class transform used!!!!)
      transform: true,
    }),
  );

  // Start-up of server
  await app.listen(appEnvConfig.port, () => {
    // Logger - Nest log instead of console.log
    Logger.log(
      `Server started on: http://${appEnvConfig.host}:${appEnvConfig.port}`,
    );
    Logger.log(
      `Swagger is available on: http://${appEnvConfig.host}:${appEnvConfig.port}/api-docs`,
    );
  });
}

void bootstrap();
