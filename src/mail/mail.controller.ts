import { Controller, Put } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('Send-mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Put()
  forgetPassword() {
    return this.mailService.forgetPassword();
  }
}
