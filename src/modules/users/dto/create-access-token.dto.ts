import { ApiProperty } from "@nestjs/swagger";

export class CreateAccessToken {
    @ApiProperty()
    client_id: string;

    @ApiProperty()
    grand_type: string

    @ApiProperty()
    client_secret: string

}