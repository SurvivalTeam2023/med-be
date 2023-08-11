import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AgeEntity } from "./entities/age.entity";
import AgeService from "./age.service";
import AgeController from "./age.controller";

@Module({
    imports: [TypeOrmModule.forFeature([AgeEntity])],
    controllers: [AgeController],
    providers: [AgeService],
})
export class AgeModule { }
