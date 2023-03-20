import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";
import { BUCKET_NAME } from 'src/environments';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { FileEntity } from './entities/file.entity';
import { InjectAws } from 'aws-sdk-v3-nest/dist/index';
@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private publicFilesRepository: Repository<FileEntity>,
    @InjectAws(S3) private readonly s3: S3
  ) { }

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {

    try {
      const uploadResult = await new Upload({
        client: this.s3,

        params: {
          Bucket: BUCKET_NAME,
          Body: dataBuffer,
          Key: `${uuid()}-${filename}`,
        }
      }).on("httpUploadProgress", (progress) => {
      }).done();
      const newFile = this.publicFilesRepository.create({
        key: uploadResult['Key'],
        url: uploadResult['Location'],
      });
      await this.publicFilesRepository.save(newFile);
      return newFile;
    } catch (error) {
    }
  }

  async getFile(id: any) {
    const file = await this.publicFilesRepository.findOneBy({
      id: parseInt(id),
    });
    return file;
  }

  async getAllFiles() {
    const file = await this.publicFilesRepository.find({});
    return { file: file };
  }
}
