// import * as path from 'node:path';
//
// import { Module } from '@nestjs/common';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { BullModule } from 'nest-bull';
//
// import { mailBullConfig } from '../../config/mail';
// import { MailController } from './mail.controller';
// import { MailQueue } from './mail.queue';
// import { MailService } from './mail.service';
//
// const bullModule = BullModule.forRoot(mailBullConfig);
//
// @Module({
//   imports: [
//     bullModule,
//     MailerModule.forRoot({
//       defaults: {
//         from: '"No Reply" <noreply@example.com>',
//       },
//       template: {
//         dir: path.join(process.env.PWD, 'templates/pages'),
//         adapter: new HandlebarsAdapter(),
//         options: {
//           strict: true,
//         },
//       },
//       options: {
//         partials: {
//           dir: path.join(process.env.PWD, 'templates/partials'),
//           options: {
//             strict: true,
//           },
//         },
//       },
//     }),
//   ],
//   controllers: [MailController],
//   providers: [MailService, MailQueue],
//   exports: [bullModule],
// })
// export class HbsModule {}
