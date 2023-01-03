import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { BUCKET_NAME } from 'src/environments';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { FileEntity } from './entities/file.entity';
@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private publicFilesRepository: Repository<FileEntity>,
  ) {}

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();
    console.log('upload', uploadResult);
    const newFile = this.publicFilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    await this.publicFilesRepository.save(newFile);
    return newFile;
  }

  async getFile(id: any, key: string) {
    console.log('id', typeof id);
    const s3 = new S3();
    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket: BUCKET_NAME,
      Key: key,
    });
    const file = await this.publicFilesRepository.findOneBy({
      id: parseInt(id),
    });
    console.log('url', url);
    return { file: file, url: url };
  }

  async getAllFiles() {
    const file = await this.publicFilesRepository.find({});
    return { file: file };
  }
}
