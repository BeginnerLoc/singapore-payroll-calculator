import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigService } from '@nestjs/config';

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
            dir: process.cwd() + '/template/',
            adapter: new EjsAdapter(),
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
