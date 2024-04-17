import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';


@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
  ) { }

  async sendEmail(sendEmailDto: SendEmailDto): Promise<boolean> {
    try {
      await this.mailerService.sendMail(sendEmailDto);
      return true;  
    } catch (e) {
      console.log(e);
      return false;  
    }
  }
}
