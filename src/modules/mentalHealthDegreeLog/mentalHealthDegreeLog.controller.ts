import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import MentalHealthDegreeLogService from "./mentalHealthDegreeLog.service";
import { Unprotected } from "nest-keycloak-connect";
import { RequestPayload } from "src/decorator/requestPayload.decorator";
import { MentalHealthDegreeLogEntity } from "./entities/mentalHealthDegreeLog.entity";
import { MentalHealthEntity } from "../mentalHealth/entities/mentalHealth.entity";

@ApiTags('MentalHealthDegreeLog')
@Controller('mentalHealthDegreeLog')
@ApiBearerAuth()
export default class MentalHealthDegreeLogController {
    constructor(private readonly mentalHealthDegreeLogService: MentalHealthDegreeLogService) { }

    @Get()
    @Unprotected()
    @ApiOperation({ summary: 'get mental health user list' })
    async findMentalHealth(
        @RequestPayload() token: string
    ): Promise<MentalHealthEntity[]> {
        return this.mentalHealthDegreeLogService.findMentalHealthUser(token)
    }
}