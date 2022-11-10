import { ApiProperty } from "@nestjs/swagger";

export class CreateAccessToken {
    @ApiProperty()
    id: string;

    @ApiProperty()
    grand_type: string

    @ApiProperty()
    secrect: string

}