import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { SubscriptionStatus } from 'src/common/enums/subscriptionStatus.enum';

export class CreateSubscriptionDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  planId: string;
}
export default CreateSubscriptionDTO;
