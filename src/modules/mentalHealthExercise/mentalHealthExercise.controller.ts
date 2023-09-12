import { Body, Controller, Param, Patch } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import MentalHealthExerciseService from "./mentalHealthExercise.service";
import { Unprotected } from "nest-keycloak-connect";
import UpdateMentalHealthExerciseDTO from "./dto/updateExercise.dto";

@ApiTags('MentalHealthExercise')
@Controller('mentalHealthExercise')
@ApiBearerAuth()
export default class MentalHealthExerciseController {
    constructor(private readonly mentalHealthExerciseService: MentalHealthExerciseService) { }

    @Patch(':id')
    @Unprotected()
    @ApiOperation({ summary: 'update' })
    async updateMentalHealthExercise(@Param('id') id: number, @Body() dto: UpdateMentalHealthExerciseDTO): Promise<any> {
        return this.mentalHealthExerciseService.updateMentalHealthExercise(id, dto);
    }
}