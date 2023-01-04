import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";
import { GenreStatus } from "src/common/enums/genreStatus.enum";


export class AddGenreToAudioDTO {
  @ApiProperty()
  @IsNumber()
  genreId: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  audioIds: number[];

}
export default AddGenreToAudioDTO;
