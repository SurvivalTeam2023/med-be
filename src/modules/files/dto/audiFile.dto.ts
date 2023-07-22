import { ApiProperty } from "@nestjs/swagger";
import { IsFileType } from "src/decorator/fileType.decorator";
export class AudioFileDTO {
    @ApiProperty({ type: 'string', format: 'binary' })
    audio: Express.Multer.File;

    @ApiProperty({ type: 'string', format: 'binary' })
    image: Express.Multer.File;
}