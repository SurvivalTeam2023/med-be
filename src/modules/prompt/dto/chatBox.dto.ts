import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';


export class ChatBoxDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    input: string;

}
export default ChatBoxDto;
