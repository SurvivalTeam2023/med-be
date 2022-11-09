import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";


export class CreateAudioPlaylistDto {

    @ApiProperty()
    @IsOptional()
    playlistId: number;
}
export default CreateAudioPlaylistDto;