import { ApiProperty } from "@nestjs/swagger";
import { GenreStatus } from "src/common/enums/genreStatus.enum";


export class CreateGenreDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  desc: string;

  @ApiProperty()
  image: string;

  @ApiProperty({ enum: GenreStatus, default: GenreStatus.ACTIVE })
  status: GenreStatus;
}
export default CreateGenreDTO;
