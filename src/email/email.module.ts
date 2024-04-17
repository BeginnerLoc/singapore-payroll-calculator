import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get('MAIL_HOST'),
            port: 465,
            secure: true,
            auth: {
              user: configService.get('NODEMAIL_USER'),
              pass: configService.get('NODEMAIL_PASS'),
            },
          },
          defaults: {
            from: '"No Reply" <study.tienloc@gmail.com>',
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        }
      }

    }),
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule { }
