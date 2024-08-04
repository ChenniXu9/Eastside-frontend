"use server";

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { nanoid } from 'nanoid';

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

export async function createFolder(folderName: string) {
  try {
    const key = folderName.endsWith('/') ? folderName : `${folderName}/`;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: ''
    });
    await client.send(command);
    if (typeof window !== 'undefined') {
      alert("Folder created successfully");
    }
  } catch (err: any) {
    console.error("Error creating folder:", err);
    if (typeof window !== 'undefined') {
      alert(`Error creating folder: ${err.message}`);
    }
  }
}

export async function onSubmit(formData: FormData, folderName: string): Promise<string | undefined> {
  try {
    const key = folderName ? `${folderName}/${nanoid()}` : nanoid();
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    });

    const formDataS3 = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formDataS3.append(key, value);
    });
    formDataS3.append('file', formData.get('file') as File);

    const response = await fetch(url, {
      method: 'POST',
      body: formDataS3,
    });

    const textResponse = await response.text();
    console.log(textResponse);

    if (response.ok) {
      if (typeof window !== 'undefined') {
        alert("File uploaded successfully");
      }
      return key;
    } else {
      if (typeof window !== 'undefined') {
        alert("Some error occurred during the file upload");
      }
    }
  } catch (err: any) {
    console.error("Error uploading file:", err);
    if (typeof window !== 'undefined') {
      alert(`Error uploading file: ${err.message}`);
    }
  }
  return undefined;
}

export async function deleteObject(key: string) {
  try {
    console.log(`Deleting object with key: ${key}`);  // 添加调试信息
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    });
    await client.send(command);
    if (typeof window !== 'undefined') {
      alert("Object deleted successfully");
    }
  } catch (err: any) {
    console.error("Error deleting object:", err);
    if (typeof window !== 'undefined') {
      alert(`Error deleting object: ${err.message}`);
    }
  }
}
