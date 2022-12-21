import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginGmailDTO {
    @IsString()
    @ApiProperty({ description: 'subject_token' })
    subject_token: string;

    @IsString()
    @ApiProperty({ description: 'username' })
    username: string;
}