import { S3 } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsSdkModule } from 'aws-sdk-v3-nest/dist/index';
import { FileEntity } from './entities/file.entity';
import { FilesController } from './file.controller';
import { FilesService } from './files.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity]), AwsSdkModule.register({
    client: new S3({
      region: 'ap-southeast-1',
    }),
  }),],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModules { }
