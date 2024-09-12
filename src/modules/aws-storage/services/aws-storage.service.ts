import { randomUUID } from 'node:crypto';
import * as path from 'node:path';

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FileContentTypeEnum } from '../../../common/enums/file-content-type.enum';
import { AwsConfig, EnvConfigType } from '../../../configs/envConfigType';

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
    fileType: FileContentTypeEnum,
    userId: string,
    fileName: string,
  ): string {
    return `${fileType}/${userId}/${randomUUID()}${path.extname(fileName)}`;
  }

  public async uploadFile(
    file: Express.Multer.File,
    fileType: FileContentTypeEnum,
    userId: string,
  ): Promise<string> {
    try {
      const filePath = this.buildPath(fileType, userId, file.originalname);
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
      Logger.log(error);
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
