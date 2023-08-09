import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsDateString, Length, IsOptional, IsNumberString, } from 'class-validator';
import { GENDER } from 'src/common/enums/userGender.enum';
import { USER_STATUS } from 'src/common/enums/userStatus.enum';
import { MatchPassword } from 'src/decorator/validate.decorator';

export class CountUserDTO {
    @ApiProperty({ required: false })
    @IsNumberString()
    @IsOptional()
    month: number;

    @ApiProperty({ enum: USER_STATUS, default: USER_STATUS.ACTIVE, required: false })
    @IsOptional()
    status: USER_STATUS;
}
