import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    const folders = await prisma.folder.findMany({
      where: { courseId: Number(courseId) },
      include: { files: true }, // Include related files
    });

    if (folders.length === 0) {
      return NextResponse.json({ error: 'No folders found for this course' }, { status: 404 });
    }

    return NextResponse.json(folders);
  } catch (error) {
    console.error('Error fetching folders:', error);
    return NextResponse.json({ error: 'Failed to fetch folders' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const { folderName, courseId } = await request.json();

    if (!folderName || !courseId) {
      return NextResponse.json({ error: 'Folder name and Course ID are required' }, { status: 400 });
    }

    // Create the new folder in the database
    const newFolder = await prisma.folder.create({
      data: {
        folderName: folderName,
        courseId: Number(courseId),
      },
    });

    // Return the created folder's ID
    return NextResponse.json({ id: newFolder.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating folder:', error);
    return NextResponse.json({ error: 'Failed to create folder' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma after the request
  }
}
