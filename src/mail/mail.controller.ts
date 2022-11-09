import { Controller, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';

@ApiTags('Send-mail')
@Controller('Send-mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Put()
  async forgetPassword() {
    return this.mailService.forgetPassword();
  }
}
