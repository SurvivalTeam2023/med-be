import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";
import { ExerciseStatus } from "src/common/enums/exerciseStatus.enum";

export class SendChatDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    registrationToken: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;



    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    body: string;



}
export default SendChatDTO;