import * as path from 'node:path';
import * as process from 'node:process';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { EnvConfigType, MailerConfigType } from '../../configs/envConfigType';
import { MailService } from './services/mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (envConfig: ConfigService<EnvConfigType>) => {
        const { email, host, pass } = envConfig.get<MailerConfigType>('mailer');
        return {
          transport: {
            host,
            auth: { user: email, pass },
            secure: true,
            tls: {
              rejectUnauthorized: false, // Ignore self-signed certificate
            },
          },
          // defaults: {
          //   from: `${from} <${email}>`,
          // },
          template: {
            dir: path.join(process.cwd(), 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService, MailerModule],

  exports: [MailService],
})
export class MailModule {}
