import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import {
  EnvConfigType,
  MailerConfigType,
} from '../../../configs/envConfigType';
import { emailResponseTree } from '../constants/email-response-tree';
import { EmailTypeEnum } from '../enums/email-type.enum';
import { DynamicContextPickType } from '../types/dynamic-context-pick.type';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<EnvConfigType>,
  ) {}

  public async sendMail<T extends EmailTypeEnum>(
    type: T,
    to: string | string[],
    context: DynamicContextPickType[T],
  ): Promise<void> {
    const { subject, template } = emailResponseTree[type];
    const { email } = this.configService.get<MailerConfigType>('mailer');
    this.mailerService
      .sendMail({
        to, // list of receivers
        from: email,
        subject, // Subject line
        template,
        context,
      })
      .then(() => {
        Logger.log('mail sent successfully');
      })
      .catch((reason) => {
        Logger.error('mail sent failed:', reason);
      });
  }
}
