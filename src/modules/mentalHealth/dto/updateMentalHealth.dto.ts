import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { MentalHealthStatus } from "src/common/enums/mentalHealth.enum";

export class UpdateMentalHealthDTO {
    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({ enum: MentalHealthStatus, default: MentalHealthStatus.ACTIVE })
    @IsOptional()
    status: MentalHealthStatus;
}
export default UpdateMentalHealthDTO;