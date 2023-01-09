import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, } from 'class-validator';

export class CreateSubscriptionTypeDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    desc: string;
}
export default CreateSubscriptionTypeDTO;
