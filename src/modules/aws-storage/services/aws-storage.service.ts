import { randomUUID } from 'node:crypto';
import * as path from 'node:path';

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AwsConfig, EnvConfigType } from '../../../configs/envConfigType';
import { FileContentTypeEnum } from '../enums/file-content-type.enum';

@Injectable()
export class AwsStorageService {
  private readonly awsConfig: AwsConfig;
  private readonly s3Client: S3Client;

  constructor(
    private readonly configService: ConfigService<EnvConfigType>,
    // private readonly logger: LoggerService,
  ) {
    this.awsConfig = this.configService.get<AwsConfig>('aws');

    this.s3Client = new S3Client({
      forcePathStyle: true /*to redirect to local bucket*/,
      endpoint: this.awsConfig.localBucket /*to redirect to local bucket*/,
      region: this.awsConfig.region,
      credentials: {
        accessKeyId: this.awsConfig.accessKeyId,
        secretAccessKey: this.awsConfig.secretAccessKey,
      },
    });
  }

  private buildPath(
    file_type: FileContentTypeEnum,
    user_id: string,
    file_name: string,
    car_id?: string,
  ): string {
    return car_id
      ? `${user_id}/${car_id}/${file_type}/${randomUUID()}${path.extname(file_name)}`
      : `${user_id}/${file_type}/${randomUUID()}${path.extname(file_name)}`;
  }

  public async uploadFile(
    file: Express.Multer.File,
    file_type: FileContentTypeEnum,
    user_id: string,
    car_id?: string,
  ): Promise<string> {
    try {
      const filePath = this.buildPath(
        file_type,
        user_id,
        file.originalname,
        car_id,
      );
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.awsConfig.bucketName,
          Key: filePath,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        }),
      );
      return filePath;
    } catch (error) {
      // this.logger.error(error);
      Logger.error(error);
    }
  }

  public async deleteFile(filePath: string): Promise<void> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.awsConfig.bucketName,
          Key: filePath,
        }),
      );
    } catch (error) {
      Logger.log(error);
      // this.logger.error(error);
    }
  }
}
