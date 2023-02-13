import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MentalHealthStatus } from 'src/common/enums/mentalHealth.enum';

export class CreateMentalHealthDegreeDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    mentalHealthId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ enum: MentalHealthStatus, default: MentalHealthStatus.ACTIVE })
    status: MentalHealthStatus;

    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    pointStart: number;

    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    pointEnd: number;

}
export default CreateMentalHealthDegreeDTO;
