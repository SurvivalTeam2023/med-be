import { Injectable } from '@nestjs/common';
import { BUCKET_NAME } from 'src/environments';
import { FilesService } from '../files/files.service';
import { InjectAws } from 'aws-sdk-v3-nest/dist/index';
import { DetectFacesCommandOutput, Emotion, FaceDetail, Rekognition } from '@aws-sdk/client-rekognition';
@Injectable()
export class FaceService {
    constructor(
        private readonly fileService: FilesService,
        @InjectAws(Rekognition) private readonly rekognition: Rekognition,
    ) {
    }

    async faceDetect(dataBuffer: Buffer, filename: string) {
        const img = await this.fileService.uploadPublicFile(dataBuffer, filename)
        const params = {
            Image: {
                S3Object: {
                    Bucket: BUCKET_NAME,
                    Name: img.key
                },
            },
            Attributes: ['ALL']
        }
        const response = await this.rekognition.detectFaces(params)
        const emotions = response.FaceDetails.map(data => {
            return data.Emotions
        })
        return emotions
    }
}