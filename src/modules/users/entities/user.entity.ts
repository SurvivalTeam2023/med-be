import { ApiProperty } from "@nestjs/swagger";

export interface User {
    
    username: string;

    password: string;
}