import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import FMCController from "./fmc.controller";
import { FirebaseAdminService } from "./fmc.service";



@Module({
    imports: [],
    controllers: [FMCController],
    providers: [FirebaseAdminService],
})
export class FMCModule { }
