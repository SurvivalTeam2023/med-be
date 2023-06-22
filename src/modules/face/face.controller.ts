import { Post, UploadedFile, UseInterceptors, Controller } from "@nestjs/common/decorators";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Unprotected } from "nest-keycloak-connect";
import { PublicFile } from "../files/dto/publicFile.dto";
import { FaceService } from "./face.service";

@ApiTags('Face')
@Controller('face')
@ApiBearerAuth()
export class FaceController {
    constructor(private readonly faceService: FaceService) { }
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'emotion detect by image' })
    @Unprotected()
    @ApiBody({
        description: 'Upload image to with file extension jpg or png',
        type: PublicFile,
    })
    async faceDetect(
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.faceService.faceDetect(file.buffer, file.originalname);
    }
}