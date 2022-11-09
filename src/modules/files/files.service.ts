import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PublicFile from './publicFile.entity';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  constructor(
    // @InjectRepository(PublicFile)
    //private readonly // private publicFilesRepository: Repository<PublicFile>,
    private readonly configService: ConfigService,
  ) {}

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({ 
        Bucket: this.configService.get('BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();
    console.log('upload', uploadResult);
    // const newFile = this.publicFilesRepository.create({
    //   key: uploadResult.Key,
    //   url: uploadResult.Location,
    // });
    // await this.publicFilesRepository.save(newFile);
    return { key: uploadResult.Key, url: uploadResult.Location };
  }

  public async generatePresignedUrl(key: string) {
    const s3 = new S3();

    const result = s3.getObject(
      {
        Bucket: this.configService.get('BUCKET_NAME'),
        Key: 'df2659ad-6d1d-418f-a756-41006e978b24-DSC08242.JPG',
      },
      (err, data) => {
        if (err) {
          return err;
        }
        console.log('data', data.Body);
        return data.Body;
      },
    );

    // return result;
    // console.log('result', result);

    // s3.getObject(
    //   {
    //     Bucket: this.configService.get('BUCKET_NAME'),
    //     Key: '904f8e3f-27d9-45e5-9ebe-0fcd7f9baec0-Berocca_Goolden boot_ 300x250.jpg',
    //   },
    //   function (err, data) {
    //     console.log('dat', data);
    //     return data;
    //   },
    // );
  }
}
