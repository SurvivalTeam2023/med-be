import { Rekognition } from '@aws-sdk/client-rekognition';
import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'aws-sdk-v3-nest/dist/index';
import { FilesModules } from '../files/file.module';
import { FaceController } from './face.controller';
import { FaceService } from './face.service';

@Module({
    imports: [FilesModules, AwsSdkModule.register({
        client: new Rekognition({
            region: 'ap-southeast-1',
        }),
    }),
    ],
    controllers: [FaceController],
    providers: [FaceService],
})
export class FaceModule { }
