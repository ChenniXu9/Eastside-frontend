"use server";

import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';
import { FolderItem, FileItem } from '@/types';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
      ContentDisposition: 'attachment'
    });
    await client.send(command);

    // Convert courseId to a number if it's not already
    const folderData = {
      folderName,
      courseId: Number(courseId), 
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
      return data.id; 
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

export async function onSubmit(formData: FormData, folderId: number, displayName: string, downloadable: boolean): Promise<FileItem | undefined> {
  try {
    console.log('Display Name in onSubmit:', displayName); 

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

    let fileData: Partial<FileItem> = {
      folderId: folder.id,
      displayName: String(displayName),
    };

    // Check if the upload is a file or a URL
    if (formData.get('file')) {
      // Handle file upload
      const key = `${folder.folderName}/` + nanoid();
      console.log('Uploading to S3 with key:', key);

      const { url, fields } = await createPresignedPost(client, {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
        Fields: {
          "Content-Type": formData.get('file')?.type || 'application/octet-stream',
        },
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
        fileData = {
          ...fileData,
          fileName: (formData.get('file') as File).name || '',
          filePath: key,
          type: (formData.get('file') as File).type || 'unknown',
          downloadable: downloadable,  // Use the original logic for downloadable files
        };
      } else {
        throw new Error('Failed to upload file to S3');
      }
    } else if (formData.get('url')) {
      // Handle URL input
      const urlInput = formData.get('url') as string;
      fileData = {
        ...fileData,
        fileName: urlInput,  
        filePath: urlInput,  
        type: 'url', 
        downloadable: false, 
      };
    }

    console.log('File Data being saved:', fileData);

    const saveResponse = await fetch(`${baseUrl}/api/file`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fileData),
    });

    if (saveResponse.ok) {
      const savedFile = await saveResponse.json(); 
      console.log('Saved file with ID:', savedFile.id); 
      return savedFile;
    } else {
      throw new Error('Failed to save file metadata');
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
    const s3BaseUrl = `https://leadership-eastside-storage.s3.us-east-2.amazonaws.com/`;
    const response = await fetch(`${baseUrl}/api/folder?courseId=${courseId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch folders and files');
    }

    const data = await response.json();

    // Ensure URLs are correctly formed
    const formattedData = data.map((folder: FolderItem) => ({
      ...folder,
      files: folder.files.map((file: FileItem) => ({
        ...file,
        url: `${s3BaseUrl}${file.filePath}`, // Construct the full URL
      }))
    }));

    console.log('Fetched and formatted data:', formattedData);
    return formattedData;
  } catch (error) {
    console.error('Error fetching folders and files:', error);
    return [];
  }
}

export async function getPresignedUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    ResponseContentDisposition: 'attachment',
  });

  const url = await getSignedUrl(client, command, { expiresIn: 3600 });
  return url;
}