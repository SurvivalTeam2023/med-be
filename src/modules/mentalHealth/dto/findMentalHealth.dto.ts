import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { MentalHealthStatus } from "src/common/enums/mentalHealth.enum";

export class FindMentalHealthDTO {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({ enum: MentalHealthStatus, default: MentalHealthStatus.ACTIVE, required: false })
    @IsOptional()
    status: MentalHealthStatus;
}
export default FindMentalHealthDTO;