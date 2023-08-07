import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { MentalHealthStatus } from 'src/common/enums/mentalHealth.enum';

export class FindMentalHealthDegreeDTO {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    mentalHealth: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    title: string;

    @ApiProperty({ enum: MentalHealthStatus, default: MentalHealthStatus.ACTIVE, required: false })
    @IsOptional()
    status: MentalHealthStatus;

}
export default FindMentalHealthDegreeDTO;
