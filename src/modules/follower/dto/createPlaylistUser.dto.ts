import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateFollowerDTO {
    @ApiProperty()
    @IsNumber()
    playlistId: number;
}
export default CreateFollowerDTO;