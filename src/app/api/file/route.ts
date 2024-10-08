import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('courseId');

  if (!courseId) {
    return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
  }

  // Fetch files associated with the given courseId through their folders
  const files = await prisma.file.findMany({
    where: {
      folder: {
        courseId: Number(courseId),
      },
    },
  });

  // Map the files to the desired structure
  const data = files.map(file => ({
    id: file.id,
    name: file.fileName,
    type: 'file',
    url: file.filePath,
    title: file.displayName || file.fileName, 
    downloadable: file.downloadable,
    key: file.filePath,
  }));

  return NextResponse.json(data);
}
  
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const file = await prisma.file.create({
      data: {
        fileName: body.fileName,
        filePath: body.filePath,
        type: body.type,
        folderId: body.folderId,
        downloadable: body.downloadable || false,
        displayName: body.displayName,
        authorId: body.authorId || null,
      },
    });

    return NextResponse.json(file, { status: 201 });
  } catch (error) {
    console.error('Error creating file:', error);
    return NextResponse.json({ error: 'Failed to create file' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const fileId = Number(params.id);

    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    await prisma.file.delete({
      where: { id: fileId },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}