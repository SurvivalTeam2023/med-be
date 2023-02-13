import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { MentalHealthStatus } from 'src/common/enums/mentalHealth.enum';

export class UpdateMentalHealthDegreeDTO {

    @ApiProperty()
    @IsOptional()
    @IsString()
    title: string;

    @ApiProperty({ enum: MentalHealthStatus, default: MentalHealthStatus.ACTIVE })
    @IsOptional()
    status: MentalHealthStatus;

    @IsOptional()
    @ApiProperty()
    @IsNumber()
    pointStart: number;

    @IsOptional()
    @ApiProperty()
    @IsNumber()
    pointEnd: number;

}
export default UpdateMentalHealthDegreeDTO;
