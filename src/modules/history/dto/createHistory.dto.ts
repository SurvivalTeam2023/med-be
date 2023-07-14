import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHistoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  audioId: number;
}
export default CreateHistoryDTO;
