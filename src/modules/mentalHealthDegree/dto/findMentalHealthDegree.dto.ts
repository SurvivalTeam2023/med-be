import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { MentalHealthStatus } from 'src/common/enums/mentalHealth.enum';

export class FindMentalHealthDegreeDTO {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    mentalHealthId: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    title: string;

    @ApiProperty({ enum: MentalHealthStatus, default: MentalHealthStatus.ACTIVE })
    @IsOptional()
    status: MentalHealthStatus;

}
export default FindMentalHealthDegreeDTO;
