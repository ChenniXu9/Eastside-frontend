"use server";

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function createFolder(folderName: string, courseId: number): Promise<number | undefined> {
  try {
    const key = folderName.endsWith('/') ? folderName : `${folderName}/`;

    // Create a placeholder object in S3 to represent the folder
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: '',
    });
    await client.send(command);

    // Convert courseId to a number if it's not already
    const folderData = {
      folderName,
      courseId: Number(courseId),  // Ensure courseId is an integer
    };

    // Debug log
    console.log('Creating folder with data:', folderData);

    // Ensure to use absolute URL in server-side environment
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Save folder metadata to the database
    const response = await fetch(`${baseUrl}/api/folder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(folderData),
    });

    if (response.ok) {
      const data = await response.json();
      return data.id; // Return the folder ID from the database
    } else {
      throw new Error('Failed to save folder metadata');
    }
  } catch (err: any) {
    console.error('Error creating folder:', err);
    if (typeof window !== 'undefined') {
      alert(`Error creating folder: ${err.message}`);
    }
  }
  return undefined;
}

export async function onSubmit(formData: FormData, folderId: number, displayName: string): Promise<FileItem | undefined> {
  try {
    console.log('Display Name in onSubmit:', displayName); // Log the displayName passed

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // Ensure the folderId is correctly passed and the URL is correct
    const folderResponse = await fetch(`${baseUrl}/api/folder?id=${folderId}`);

    if (!folderResponse.ok) {
      throw new Error('Failed to fetch folder');
    }

    const folder = await folderResponse.json();
    console.log('Folder fetched:', folder);
    
    if (!folder?.id) {
      throw new Error('Folder not found');
    }

    const key = `${folder.folderName}/` + nanoid(); // Ensure you're using `folder.folderName`
    console.log('Uploading to S3 with key:', key);

    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    });

    const formDataS3 = new FormData();
    Object.entries(fields).forEach(([fieldKey, value]) => {
      formDataS3.append(fieldKey, value);
    });
    formDataS3.append('file', formData.get('file') as File);

    const response = await fetch(url, {
      method: 'POST',
      body: formDataS3,
    });

    if (response.ok) {
      const fileData = {
        fileName: formData.get('file')?.name || '',
        filePath: key,
        type: formData.get('file')?.type || 'unknown',
        folderId: folder.id,
        displayName: String(displayName),
      };

      console.log('File Data being saved:', fileData);

      const saveResponse = await fetch(`${baseUrl}/api/file`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fileData),
      });

      if (saveResponse.ok) {
        const savedFile = await saveResponse.json(); // Get the saved file, including its id
        console.log('Saved file with ID:', savedFile.id); // Log the saved file id
        return savedFile; // Return the full file metadata including id
      } else {
        throw new Error('Failed to save file metadata');
      }
    } else {
      throw new Error('Failed to upload file to S3');
    }
  } catch (err: any) {
    console.error('Error uploading file:', err);
  }
  return undefined;
}

// Delete an object from S3 and remove its metadata from the database
export async function deleteObject(filePath: string, fileId: number) {
  try {
    // Delete the object from S3
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: filePath,
    });
    await client.send(command);

    // Remove file metadata from the database directly using Prisma
    await prisma.file.delete({
      where: { id: fileId },
    });
    
    console.log(`File metadata with ID ${fileId} deleted successfully from the database`);
  } catch (err: any) {
    console.error('Error deleting object:', err);
  } finally {
    await prisma.$disconnect(); 
  }
}

// Fetch files and folders metadata from the database
export async function fetchFilesAndFolders(courseId: number): Promise<FolderItem[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/folder?courseId=${courseId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch folders and files');
    }

    const data = await response.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching folders and files:', error);
    return [];
  }
}
