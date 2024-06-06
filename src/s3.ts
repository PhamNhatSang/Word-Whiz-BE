import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import dotenv from 'dotenv'
import crypto from 'crypto'
import sharp from 'sharp'
dotenv.config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})


export function uploadFile(fileBuffer: Buffer, mimetype: string) {

  const imageName = crypto.randomBytes(32).toString('hex')
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: imageName,
        ContentType: mimetype
    }

     s3Client.send(new PutObjectCommand(uploadParams));
    return imageName
}

export function deleteFile(fileName: any) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  }

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}

export async function getObjectSignedUrl(key: string) {
    const params = {
        Bucket: bucketName,
        Key: key
    }

    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return url
}