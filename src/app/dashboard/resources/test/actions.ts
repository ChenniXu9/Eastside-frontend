"use server";

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
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
    console.log("Folder created successfully");
  } catch (err: any) {
    console.error("Error creating folder:", err);
  }
}

export async function onSubmit(formData: FormData, folderName: string) {
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
      console.log("File uploaded successfully");
    } else {
      console.log("Some error occurred during the file upload");
    }
  } catch (err: any) {
    console.error("Error uploading file:", err);
  }
}


// "use server";

// import { S3Client } from '@aws-sdk/client-s3';
// import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
// import { nanoid } from 'nanoid';

// export async function onSubmit(formData:FormData) {
//   try {
//     const client = new S3Client({
//       region: process.env.AWS_REGION
//     })
    
//     const {url, fields} = await createPresignedPost(client, {
//       Bucket: process.env.AWS_BUCKET_NAME || '', 
//       Key: nanoid()
//     })

//     const formDataS3 = new FormData()
//     Object.entries(fields).forEach(([key, value]) => {
//       formDataS3.append(key, value)
//     })
//     formDataS3.append('file', formData.get('file') as string)

//     const response = await fetch(url, {
//       method: 'POST', 
//       body: formDataS3
//     })

//     const textResponse = await response.text()
//     console.log(textResponse)

//     if (response.ok) {
//       console.log("File uploaded")
//     } else {
//       console.log("Some error occurred during the file uploaded")
//     }


//   } catch (err: any) {
//     console.log(err)
//   }
// }


