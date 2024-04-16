import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';


@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
  ) { }

  sendEmail(sendEmailDto: SendEmailDto): void {
    this.mailerService
      .sendMail(sendEmailDto)
      .then(() => { console.log("Sent!") })
      .catch((e) => { console.log(e) });
  }
}
