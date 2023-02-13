import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { MentalHealthStatus } from "src/common/enums/mentalHealth.enum";

export class CreateMentalHealthDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ enum: MentalHealthStatus, default: MentalHealthStatus.ACTIVE })
    status: MentalHealthStatus;
}
export default CreateMentalHealthDTO;